import { Injectable } from '@nestjs/common';

@Injectable()
export class GameRoomShared {
    private rooms: string[] = [];

    addRoom(id: string): void {
        this.rooms.push(id);
    }

    removeRoom(id: string): void {
        const index = this.rooms.indexOf(id);
        this.rooms.splice(index, 1);
    }

    getRoom() {
        return this.rooms;
    }

    shift(): string {
        return this.rooms.shift();
    }
}