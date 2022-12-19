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
	async Oauth(
		@Body('code') code: string,
		@Headers() header: any,
		@Res() res: any,
	) {
		let jwt;
		try {
			jwt = await this.AuthService.login(code);
		}
		catch (err) {
			console.log('-> error', err);
			res.status(401).send('Unauthorized');
			return ;
		}
		// console.log('jwt ->', jwt);
		return jwt.access_token;
	}
}