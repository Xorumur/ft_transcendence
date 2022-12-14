import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameRoomShared } from '../gameRoomShared/gameRoomShared.room';
import { Game } from "./game.service"


@Injectable()
@WebSocketGateway({
    path: "/game",
    cors:
        { origin: "*", }
})
export class GameGateway {
    @WebSocketServer() server: Server;
    private game: Game;

    constructor(private roomIdService: GameRoomShared) { }

    onModuleInit() {
        this.game = new Game(this.server);
    }

    @SubscribeMessage('connection')
    handleConnection(client: Socket) {
        console.log("new connection");
        this.game.addPlayer(client, this.roomIdService);
        client.on('disconnect', () => {
            this.game.removePlayer(client);
            console.log('game disocennect');
        })
    }

    @SubscribeMessage('playerUp')
    handleMouvementUp(client: Socket, y: number) {
        this.game.up(client, y);
    }

    @SubscribeMessage('playerDown')
    handleMouvementDown(client: Socket, y: number) {
        this.game.down(client, y);
    }

}