import { Module } from '@nestjs/common';
import { RoomService } from './../game/game.room';
import { MatchmakingGateway } from './matchmaking.gateway';

@Module({
    providers: [MatchmakingGateway, RoomService]
})
export class MatchmakingModule { }
