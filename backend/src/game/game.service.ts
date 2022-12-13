import { Server, Socket } from 'socket.io';

export class Game {
    private server: Server;
    private players: Socket[] = [];
    private spectators: Socket[] = [];

    private val1: number = 0;
    private val2: number = 0;

    constructor(server: Server) {
        this.server = server;
    }

    addPlayer(client: Socket) {
        if (this.players.length >= 2) {
            this.spectators.push(client);
            client.emit('game-message', 'You are now a spectator.');
        } else {
            this.players.push(client);
            this.server.emit('game-message', 'Welcome to the game!');
        }
    }

    inc1(client: Socket) {
        if (this.players.includes(client)) {
            if (client.id == this.players[0].id) { this.val1++; }
            this.server.emit('inc', [this.val1, this.val2])
        }
    }

    inc2(client: Socket) {
        if (this.players.includes(client)) {
            if (client.id == this.players[1].id) { this.val2++; }
            this.server.emit('inc', [this.val1, this.val2])
        }
    }


}
