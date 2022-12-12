import { Module } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { UsersModule } from '../user/user.module';
import { AuthService } from './au.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constant';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
	  imports: [
				UsersModule,
				JwtModule.register({
					secret: jwtConstants.secret,
				}),
				],
	  providers: [AuthService, LocalStrategy, UsersService, JwtStrategy],
	  controllers: [AuthController],
})

export class AuthModule {}
