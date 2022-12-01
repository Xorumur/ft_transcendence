import { Controller, Req, Get, Headers, Post , Body, ValidationPipe, UsePipes} from '@nestjs/common';
import { get } from 'http';
import { AuthService } from './auth.service';
import fetch from 'node-fetch';
// import { UsersService } from './user.service';
// import { Request } from 'express';
// import { User } from './user.entity';
// import {CreateUserDto} from './user.dto'


@Controller('auth')
export class AuthController {
	constructor(private readonly AuthService: AuthService) {}

	
	// This is how to get the json body of the request.
	@Post()
	async Oauth(
		@Body('code') code : string,
		@Headers() header : any
		) {
			console.log('code ->', code);
			// Get the Access token from the 42 API
			const resp = await this.AuthService.authenticateUser(code, header.host);
			console.log('resp ->', resp);
			let token = resp.access_token;

			// Exemple to how to get the user info from the 42 API
			let request = await fetch('https://api.intra.42.fr/v2/me', {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
			let info = await request.json();
			let userId = info.id;
			let userIntra = info.login;
			let userMail = info.email;
			let	userFirstName = info.first_name;
			let userLastName = info.last_name;
			let imageUrl = info.image.link;
			console.log('-> info', info);
			console.log('-> userId', userId);
			console.log('-> userIntra', userIntra);
			console.log('-> userMail', userMail);
			console.log('-> userFirstName', userFirstName);
			console.log('-> userLastName', userLastName);
			console.log('-> imageUrl', imageUrl);
			// return resp;
			
			// console.log('-> request', info);
			// let userInfo = await this.AuthService.getUserInfo(token);
			// console.log('-> userInfo', userInfo);
	}	

	// @Get('db')
	// getName() : string {
	// 	return this.UsersService.findOneByIntra('mlecherb');
	// }

  
}