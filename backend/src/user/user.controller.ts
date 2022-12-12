import { Controller, Get, Post , Body, ValidationPipe, UsePipes, Req, Res, Param} from '@nestjs/common';
import { UsersService } from './user.service';
import { Request } from 'express';
import { User } from './user.entity';

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

	@Get(':name')
	async Search(@Param() name : any ,@Req() req: Request, ) {
		let opt = name.name;
		console.log('-> opt', opt);
		let user = await this.UsersService.findOneByIntra(opt);
		console.log('-> user', user);
		return user;
	}
}
