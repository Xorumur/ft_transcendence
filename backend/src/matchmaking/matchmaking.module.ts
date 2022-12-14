import { Module } from '@nestjs/common';
import { GameRoomSharedModule } from '../gameRoomShared/gameRoomShared.module';
import { MatchmakingGateway } from './matchmaking.gateway';

@Module({
    imports: [GameRoomSharedModule],
    providers: [MatchmakingGateway]
})
export class MatchmakingModule { }
