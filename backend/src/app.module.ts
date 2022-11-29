import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { User } from './user/user.entity';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './data.module';
import { DataSource } from 'typeorm';

// import { UsersController } from './user/user.controller';

// @Module({
// //   imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), UsersModule],
// 	imports: [
// 		ConfigModule.forRoot({
// 			validationSchema: Joi.object({
// 				POSTGRES_HOST: Joi.string().required(),
// 				POSTGRES_PORT: Joi.number().required(),
// 				POSTGRES_USER: Joi.string().required(),
// 				POSTGRES_PASSWORD: Joi.string().required(),
// 				POSTGRES_DB: Joi.string().required(),
// 				PORT: Joi.number(),
// 				entities: [__dirname + '/../**/*.entity.{js,ts}', User],
// 				synchronize: true,
// 			}),
// 		}),
// 		DatabaseModule,
// 		UsersModule,
// 	],
// 	controllers: [AppController],
// 	providers: [AppService],
// })

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
	  DatabaseModule,
	  UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
  })

export class AppModule {
	constructor(private dataSource: DataSource) {}
}
