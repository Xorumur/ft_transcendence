import { Injectable } from '@nestjs/common';
import { Socket } from "socket.io";

@Injectable()
export class GameRoomShared {
    private rooms: Socket[] = [];

    addRoom(id: Socket): void {
        this.rooms.push(id);
    }

    removeRoom(id: Socket): void {
        const index = this.rooms.indexOf(id);
        this.rooms.splice(index, 1);
    }

    getRoom() {
        return this.rooms;
    }

    shift(): Socket {
        return this.rooms.shift();
    }
}