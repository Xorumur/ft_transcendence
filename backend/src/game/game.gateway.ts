import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Game } from "./game.service"
import { CustomSocket } from './game.customSocket';

@Injectable()
@WebSocketGateway({
	path: "/game",
	cors:
		{ origin: "*", }
})
export class GameGateway {
	@WebSocketServer() server: Server;
	// private game: Game;
	//array of game objects to be able to handle mutiple game played at the same time
	private GameRooms: Game[] = [];

	@SubscribeMessage('connection')
	handleConnection(@ConnectedSocket() client: CustomSocket) {
		//store roomId in client
		client.roomId = client.handshake.query.roomId;

		const game = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		//Create room if not existing
		if (game) {
			game.join(client);
			game.newBallPos();
		}
		else {
			console.log("new room created");
			this.GameRooms.push(new Game(this.server, client))
		}

		//handle disconnections
		client.on('disconnect', () => {
			// game.disconnect(client);
			//need to implement check if both players are dc to erase game
			console.log('game disocennect');
		})
	}

	//handle player mouvement up
	@SubscribeMessage('playerUp')
	handleMouvementUp(client: CustomSocket, y: number) {
		const currentGame = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		currentGame.up(client, y);
	}

	//handle player mouvement down
	@SubscribeMessage('playerDown')
	handleMouvementDown(client: CustomSocket, y: number) {
		const currentGame = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		currentGame.down(client, y);
	}

	//handle ball collision
	@SubscribeMessage('ballCollision')
	handleCollison(client: CustomSocket, ball: any) {
		const currentGame = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		currentGame.collision(client, ball)
	}

	//handle score update
	@SubscribeMessage('score')
	handleScore(client: CustomSocket, scoreInfo: number) {
		const currentGame = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		currentGame.score(client, scoreInfo)
	}

	//handle mouse mouvement
	@SubscribeMessage('mouseMove')
	handleMouseMove(client: CustomSocket, playerInfo: any) {
		const currentGame = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		currentGame.mouseMove(client, playerInfo)

	}

	@SubscribeMessage('keyDown')
	handleKeyDown(client: CustomSocket) {
		const currentGame = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		currentGame.keyDown(client);
	}

	@SubscribeMessage('ball')
	handleBallPos(client: CustomSocket) {
		const currentGame = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		currentGame.newBallPos();
	}

}