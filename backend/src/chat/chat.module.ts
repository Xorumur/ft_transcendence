import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { User } from '../user/user.entity';
import { Chat } from './chat.entity';
import { Gateway } from './Gateway';
import { UsersService } from '../user/user.service';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UsersModule],
  providers: [ChatService, Gateway, UsersService],
  controllers: [ChatController],
})

export class ChatModule {}