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

	// @Post()
	// async Oauth(
	// 	@Body('code') code: string,
	// 	@Headers() header: any,
	// 	@Res() res: any,
	// ) {
	// 	let jwt;
	// 	try {
	// 		jwt = await this.AuthService.login(code);
	// 	}
	// 	catch (err) {
	// 		console.log('-> error', err);
	// 		res.status(401).send('Unauthorized');
	// 		return ;
	// 	}
	// 	if (!jwt) {
	// 		res.status(401).send('Unauthorized');
	// 		return ;
	// 	}
	// 	// console.log('jwt ->', jwt);
	// 	return jwt.access_token;
	// }

	/* In this function the front provide the code and the back return the jwt
		otherwise return null.
	*/
	@Post()
	async login( @Body('code') code: string, @Res() res:any) {
		let ret = await this.AuthService.auth(code, res);
		console.log('-> ret', ret);
		res.status(200).send(ret);
	}
}