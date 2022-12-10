import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { User } from '../user/user.entity';
import { ChatRoom } from './chat.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  providers: [ChatService],
  controllers: [ChatController],
//   exports: [TypeOrmModule],
})
export class ChatModule {}