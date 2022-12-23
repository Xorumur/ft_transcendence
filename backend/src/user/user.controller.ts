import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { Request } from 'express';
import { User } from './user.entity';

@Controller('user')
export class UsersController {
	constructor(
		private readonly UsersService: UsersService,
	) { }

	@Get('obj')
	async getObj(@Req() req: Request) {
		console.log('-> req.user', req.user);
		let user = req.user as User;
		// res.user = user;
		console.log('-> user', user);
		return user;
	}

	@Post('result')
	async pushResult(@Req() req: Request, @Body() body: any) {
		let user = req.user as User;
		return await this.UsersService.pushResult(user.intra, body.opponent, body.winner);
	}

	@Get('logged')
	async isLogged(@Req() req: Request) {
		console.log('test');
	}
	@Get(':name')
	async Search(@Param() name: any, @Req() req: Request,) {
		let opt = name.name;
		console.log('-> opt', opt);
		let user = await this.UsersService.findOneByIntra(opt);
		console.log('-> user', user);
		return user;
	}
}
