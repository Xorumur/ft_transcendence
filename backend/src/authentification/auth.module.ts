import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../user/user.service';
import { UsersController } from '../user/user.controller';
import { UsersModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';

@Module({
	  imports: [HttpModule],
	  providers: [AuthService],
	  controllers: [AuthController],
	//   exports: [],
})

export class AuthModule {}