import { Controller, Req, Get, Headers, Post , Body, ValidationPipe, UsePipes} from '@nestjs/common';
import { AuthService } from './auth.service';
import fetch from 'node-fetch';
import { UsersService } from '../user/user.service';
// import { Request } from 'express';
// import { User } from './user.entity';
// import {CreateUserDto} from './user.dto'


@Controller('auth')
export class AuthController {
	constructor(
		private readonly AuthService: AuthService,
		private readonly UserService: UsersService
		) {}

	
	// This is how to get the json body of the request.
	@Post()
	async Oauth(
		@Body('code') code : string,
		@Headers() header : any
		) {
			console.log('code ->', code);

			// Get the Access token from the 42 API
			// let resp;
			// try {
			let resp = await this.AuthService.authenticateUser(code, header.host);
			// }
			// catch (err) {
				// console.log(err);
			// }


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
			let data = { 
				UserId : info.id,
				Intra : info.login,
				Email : info.email,
				FirstName : info.first_name,
				LastName : info.last_name,
				ImageUrl : info.image.link,
				token : token,
			}
			console.log(data);
			await this.UserService.createUser(data.UserId, data.UserId, data.FirstName, data.LastName, data.Intra, data.Email, data.ImageUrl, token);
			console.log('-> token : ', token);
			return token;
	}	
}