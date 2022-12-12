import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayInit,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';
import { UsersService } from '../user/user.service';

@WebSocketGateway({
	namespace: 'chat',
	cors: {
		origin: '*',
	},
})
export class Gateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() wss: Server;
	constructor(
		private readonly chatService: ChatService,
		private readonly userService: UsersService,
		) {}
	afterInit(server: Server) {
		console.log('Init');
	}

	handleConnection(client: Socket, ...args: any[]) {
		console.log('Client connected');
	}

	handleDisconnect(client: Socket) {
		console.log('Client disconnected');
	}
}