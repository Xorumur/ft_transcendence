import { Server, Socket } from 'socket.io';
import { GameRoomShared } from '../gameRoomShared/gameRoomShared.room';
import { v4 } from 'uuid';
import { AzureActiveDirectoryAccessTokenAuthentication } from 'typeorm/driver/sqlserver/authentication/AzureActiveDirectoryAccessTokenAuthentication';

export class Game {
    private server: Server;
    private players: Socket[] = [];
    private spectators: Socket[] = [];

    private roomId: string;

    constructor(server: Server) {
        this.roomId = v4();
        this.server = server;
    }

    addPlayer(client: Socket, gameRoom: GameRoomShared) {
        if (this.players.length >= 2) {
            this.spectators.push(client);
            client.emit('game-message', 'You are now a spectator.');
        }
        else {
            this.players.push(client);
            this.server.emit('game-message', 'Welcome to the game!');
            if (this.players.length == 2) {
                this.players[0].join(this.roomId);
                this.players[1].join(this.roomId);
            }
        }
    }

    removePlayer(client: Socket) {
        if (this.players.includes(client)) {
            const index = this.players.indexOf(client);
            this.players.splice(index, 1);
        }
        else if (this.spectators.includes(client)) {
            const index = this.spectators.indexOf(client);
            this.spectators.splice(index, 1);
        }
    }

    up(client: Socket, y: number) {
        if (this.players.includes(client)) {
            if (this.players[0].id == client.id) {
                this.server.to(this.roomId).emit('playerMove', [y[0], y[1] - 5]);
            }
            else if (this.players[1].id == client.id) {
                this.server.to(this.roomId).emit('playerMove', [y[0] - 5, y[1]]);
            }
        }
    }

    down(client: Socket, y: number) {
        if (this.players.includes(client)) {
            if (this.players[0].id == client.id) {
                this.server.to(this.roomId).emit('playerMove', [y[0], y[1] + 5]);
            }
            else if (this.players[1].id == client.id) {
                this.server.to(this.roomId).emit('playerMove', [y[0] + 5, y[1]]);
            }
        }
    }
}
