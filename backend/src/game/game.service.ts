import { Server } from 'socket.io';
import { CustomSocket } from './game.customSocket';

export class Game {
	private server: Server;
	// private players: CustomSocket[] = [];
	private roomId: string | string[];
	private numberPlayer = 0;
	private rand: number[] = [Math.random() < 0.5 ? 1 : -1, Math.random() < 0.5 ? 1 : -1];


	//get values for the game object + call join for first client
	constructor(server: Server, client: CustomSocket) {
		this.server = server;
		this.roomId = client.roomId;
		this.join(client);
	}

	//self-explantory
	getRoomId(): string | string[] {
		return this.roomId;
	}


	//function called when new player joins the game, 
	join(client: CustomSocket) {
		if (this.numberPlayer >= 2) {
			//set client as a spectator
			client.isSpectator = true;
			client.join(client.handshake.query.roomId);
			client.emit('game-message', 'You are now a spectator.');
		}
		else {
			//set client as a player
			client.playerIndex = ++this.numberPlayer;
			client.isPlayer = true;
			client.join(this.roomId);
			this.server.emit('game-message', 'Welcome to the game!');
		}
	}

	//if client is player, reduce y axe of the paddle resulting in moving up
	up(client: CustomSocket, y: number) {
		if (client.isPlayer === true) {
			//check player index to determine which player should move
			if (client.playerIndex == 1) {
				this.server.to(client.roomId).emit('playerMove', [y[0] = 1, y[1]]);
			}
			else if (client.playerIndex == 2) {
				this.server.to(client.roomId).emit('playerMove', [y[0], y[1] = 1]);
			}
		}
	}

	//if client is player, augment y axe of the paddle resulting in moving down
	down(client: CustomSocket, y: number) {
		if (client.isPlayer === true) {
			//check player index to determine which player should move
			if (client.playerIndex === 1) {
				this.server.to(client.roomId).emit('playerMove', [y[0] = 2, y[1]]);
			}
			else if (client.playerIndex === 2) {
				this.server.to(client.roomId).emit('playerMove', [y[0], y[1] = 2]);
			}
		}
	}

	collision(client: CustomSocket, ball: any) {
		let isWall = false;
		if (ball[1] == "wall") {
			ball[0].y_vel *= -1;
			isWall = true;
		}
		else if (ball[1] == "paddle") {
			ball[0].x_vel *= -1.1;
			ball[0].y_vel *= 1.1;
		}
		this.rand = [Math.random() < 0.5 ? 1 : -1, Math.random() < 0.5 ? 1 : -1];
		this.server.to(client.roomId).emit('collision', [ball[0], isWall]);
	}

	score(client: CustomSocket, scoreInfo: any) {
		if (scoreInfo[1] == "p1") {
			if (++scoreInfo[0].p1 == 10) {
				this.server.to(this.roomId).emit("stopGame");

			}
		}
		else {
			if (++scoreInfo[0].p2 == 10) {
				this.server.to(this.roomId).emit("stopGame");
			}
		}
		this.server.to(client.roomId).emit('score', scoreInfo[0]);
	}

	mouseMove(client: CustomSocket, playerInfo: any) {
		if (client.isPlayer === true) {
			if (client.playerIndex === 1) {
				playerInfo[1] = playerInfo[0]
			}
			else {
				playerInfo[2] = playerInfo[0];
			}
		}
		this.server.to(client.roomId).emit('playerMove', [playerInfo[1], playerInfo[2]]);
	}

	keyDown(client: CustomSocket) {
		if (client.isPlayer === true) {
			if (client.playerIndex === 1) {
				this.server.to(this.roomId).emit('Down', 1);
			}
			else {
				this.server.to(this.roomId).emit('Down', 2);
			}
		}
	}

	newBallPos() {
		this.server.to(this.roomId).emit('ball', this.rand)
	}

	disconnect(client: CustomSocket) {
		if (client.isPlayer === true) {
			this.numberPlayer--;
		}
		if (this.numberPlayer === 0) {

			return true;
		}
		return false;
	}
}
