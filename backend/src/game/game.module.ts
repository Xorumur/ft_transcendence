import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
// import { RoomService } from './game.room';

@Module({
    // imports: [RoomService],
    providers: [GameGateway]
})
export class GameModule { }
