import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './game.room';
import { Game } from "./game.service"

// @Injectable()
@WebSocketGateway({
    path: "/game",
    cors:
        { origin: "*", }
})
export class GameGateway {
    @WebSocketServer() server: Server;
    private game: Game;

    // constructor(private readonly roomIdService: RoomService) { }

    onModuleInit() {
        this.game = new Game(this.server);
    }

    @SubscribeMessage('connection')
    handleConnection(client: Socket) {
        this.game.addPlayer(client);
    }

    @SubscribeMessage('inc')
    handleInc(client: Socket) {
        this.game.inc1(client);
    }
    @SubscribeMessage('inc2')
    handleInc2(client: Socket) {
        this.game.inc2(client);
    }
}