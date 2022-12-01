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
import { GoogleModule } from './google_auth/google.module';

@Module({
	  imports: [HttpModule, GoogleModule, UsersModule],
	  providers: [AuthService, UsersService],
	  controllers: [AuthController],
	//   exports: [],
})

export class AuthModule {}