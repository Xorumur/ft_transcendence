import { Socket } from "socket.io";

//create a custom Socket class that extends the Socket class provided by @nestjs/websockets
export class CustomSocket extends Socket {
	//add a roomId property to the CustomSocket class
	roomId: string | string[];
	isPlayer: boolean = false;
	isSpectator: boolean = false;
	playerIndex: number = 0;
}
