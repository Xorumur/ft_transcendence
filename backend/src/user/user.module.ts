import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User, History } from './user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, History])],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [TypeOrmModule],
})
export class UsersModule { }