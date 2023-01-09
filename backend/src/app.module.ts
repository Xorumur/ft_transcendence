import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { configService } from './config/config.service';
import { User } from './user/user.entity';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/au.module';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggingMiddleware } from './auth/logging.middleware';
import { JwtService } from '@nestjs/jwt';
import { Chat } from './chat/chat.entity';
import { ChatModule } from './chat/chat.module';
import { MatchmakingModule } from './matchmaking/matchmaking.module';
import { GameModule } from './game/game.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			entities: [
				User,
				Chat,
			],
			logging: false,
			synchronize: true,
			autoLoadEntities: true,
		}),
		UsersModule,
		AuthModule,
		ChatModule,
		MatchmakingModule,
		GameModule,
	],
	controllers: [AppController],
	providers: [AppService, JwtService],
})

export class AppModule implements NestModule {
	constructor(private dataSource: DataSource) { }
	configure(consumer: MiddlewareConsumer) {
		// If you want to check if the user is logged in, you can use this middleware.
		consumer.apply(LoggingMiddleware).forRoutes("/user");
		consumer.apply(LoggingMiddleware).forRoutes("/user/img");
		consumer.apply(LoggingMiddleware).forRoutes("/user/obj");
		// consumer.apply(LoggingMiddleware).forRoutes("/user/result");
	}
}
