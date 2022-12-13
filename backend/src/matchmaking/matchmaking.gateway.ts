import { Injectable } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RoomService } from "./../game/game.room";
import { v4 } from 'uuid';

@Injectable()
@WebSocketGateway({
    path: "/matchmaking",
    cors:
        { origin: '*' }
})
export class MatchmakingGateway {
    private queue: Socket[] = [];
    @WebSocketServer() server: Server;

    constructor(private readonly roomIdService: RoomService) { }

    @SubscribeMessage('connection')
    handleConnection(client: Socket) {
        this.server.emit('game-message', "you joined !");

        client.on('disconnect', () => {
            console.log("Disconncted !!");
        })
    }

    @SubscribeMessage('joinQueue')
    joinQueue(client: Socket) {
        this.queue.push(client);
        this.matchPlayer();
        console.log("Queue joined !")
    }

    @SubscribeMessage('leaveQueue')
    leaveQueue(client: Socket) {
        const index = this.queue.indexOf(client);
        this.queue.splice(index, 1);
        console.log("Queue quitted !")
    }

    matchPlayer() {
        if (this.queue.length >= 2) {
            const player1 = this.queue.shift();
            const player2 = this.queue.shift();
            const roomId = v4();
            player1.join(roomId);
            player2.join(roomId);
            this.roomIdService.addRoom(roomId);
            player1.emit('matched', roomId)
            player2.emit('matched', roomId)
        }
    }
}