import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameRoomShared } from '../gameRoomShared/gameRoomShared.room';
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
	//array of game objects to be able to handle mutiple games played at the same time
	private GameRooms: Game[] = [];

	constructor(private roomIdService: GameRoomShared) { }

	// onModuleInit() {
	//     this.game = new Game(this.server);
	// }

	@SubscribeMessage('connection')
	handleConnection(@ConnectedSocket() client: CustomSocket) {
		//store roomId in client
		client.roomId = client.handshake.query.roomId;
		//Create toom if not existing
		const game = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		if (game) {
			game.join(client);
		}
		else {
			console.log("new room created");
			this.GameRooms.push(new Game(this.server, client))
		}

		//handle disconnections
		client.on('disconnect', () => {
			// this.game.removePlayer(client);
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

	@SubscribeMessage('ballCollision')
	handleCollison(client: CustomSocket, ball: any) {
		const currentGame = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		currentGame.collision(client, ball)
	}

	@SubscribeMessage('score')
	handleScore(client: CustomSocket, scoreInfo: number) {
		const currentGame = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		currentGame.score(client, scoreInfo)
	}

	@SubscribeMessage('mouseMove')
	handleMouseMove(client: CustomSocket, playerInfo: any) {
		const currentGame = this.GameRooms.find(game => game.getRoomId() === client.roomId)
		currentGame.mouseMove(client, playerInfo)

	}

}