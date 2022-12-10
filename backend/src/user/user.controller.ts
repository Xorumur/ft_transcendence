import { Controller, Get, Post , Body, ValidationPipe, UsePipes, Req, Res} from '@nestjs/common';
import { UsersService } from './user.service';
import { Request } from 'express';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Controller('user')
export class UsersController {
	constructor(
		private readonly UsersService: UsersService,
		) {}

	@Get('obj')
	async getObj(@Req() req: Request) {
		console.log('-> req.user', req.user);
		let user = req.user as User;
		// res.user = user;
		console.log('-> user', user);
		return user;
	}
}
