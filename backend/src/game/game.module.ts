import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameRoomSharedModule } from '../gameRoomShared/gameRoomShared.module';

@Module({
    imports: [GameRoomSharedModule],
    providers: [GameGateway]
})
export class GameModule { }
