import { Injectable } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { v4 } from 'uuid';

@Injectable()
@WebSocketGateway({
	path: "/matchmaking",
	cors:
		{ origin: '*' }
})
export class MatchmakingGateway {
	//master queue that contain 3 subarrays that represents 1 game mode each, default, speed and ghost
	private masterQueue: Socket[][] = [[], [], []];
	@WebSocketServer() server: Server;

	@SubscribeMessage('connection')
	handleConnection(client: Socket) {
		this.server.emit('game-message', "you joined !");

		client.on('disconnect', () => {
			console.log("Disconncted !!");
		})
	}

	@SubscribeMessage('joinQueue')
	joinQueue(client: Socket, gameMode: number) {
		this.masterQueue[gameMode].push(client);
		this.matchPlayer(gameMode);
		console.log("Queue joined !")
	}

	@SubscribeMessage('leaveQueue')
	leaveQueue(client: Socket, gameMode: number) {
		const index = this.masterQueue[gameMode].indexOf(client);
		this.masterQueue[gameMode].splice(index, 1);
		console.log("Queue quitted !")
	}


	matchPlayer(gameMode: number) {
		if (this.masterQueue[gameMode].length >= 2) {
			const player1 = this.masterQueue[gameMode].shift();
			const player2 = this.masterQueue[gameMode].shift();
			const roomId = v4();
			player1.emit('matched', roomId);
			player2.emit('matched', roomId);
		}
	}

}