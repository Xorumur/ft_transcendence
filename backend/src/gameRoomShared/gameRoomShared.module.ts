import { Module } from '@nestjs/common';
import { GameRoomShared } from './gameRoomShared.room';

@Module({
    providers: [GameRoomShared],
    exports: [GameRoomShared]
})
export class GameRoomSharedModule { }
