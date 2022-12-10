import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { configService } from './config/config.service';
import { User } from './user/user.entity';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './data.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/au.module';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggingMiddleware } from './auth/logging.middleware';
import { JwtService } from '@nestjs/jwt';
// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.get('/google', (req, res) => { res.end('ok'); });
// app.use(cors())


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
		],
		logging: false,
		synchronize: true,
		autoLoadEntities: true,
	  }),
	  UsersModule,
	  AuthModule,
	],
	controllers: [AppController],
	providers: [AppService, JwtService],
})

export class AppModule implements NestModule {
	constructor(private dataSource: DataSource) {}
	configure(consumer: MiddlewareConsumer) {
	  consumer.apply(LoggingMiddleware).forRoutes("/user/img");
	  consumer.apply(LoggingMiddleware).forRoutes("/user/obj");
	}
  }
