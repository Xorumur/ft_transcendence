import { Controller, Req, Get, Headers, Post, Body, ValidationPipe, UsePipes, Res } from '@nestjs/common';
import { AuthService } from '../auth/au.service';
import { JwtService } from '@nestjs/jwt';
import { throwError } from 'rxjs';


@Controller('auth')
export class AuthController {
	constructor(
		private readonly AuthService: AuthService,
		private readonly jwtService: JwtService,
	) { }
	
	@Post()
	async login( @Body('code') code: string, @Res() res:any) {
		let ret = await this.AuthService.auth(code, res);
		// console.log('-> ret', ret);
		res.status(200).send(ret);
	}
}