import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import fetch from 'node-fetch';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) { }

	async validateUser(id: number): Promise<any> {
		const user = await this.usersService.findOne(id);
		if (!user) {
			return null;
		}
		return user;
	}

	async authenticateUser(code: string) {
		console.log('-> USER_ID', process.env.USER_ID);
		console.log('-> USER_SECRET', process.env.USER_SECRET);
		const url = 'https://api.intra.42.fr/oauth/token';
		let token = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				grant_type: 'authorization_code',
				client_id: process.env.USER_ID,
				client_secret: process.env.USER_SECRET,
				code: code,
				redirect_uri: 'http://localhost:3000',
			})
		})
		try {
			let tok = await token.json();
			return tok;
		}
		catch (err) {
			console.log(err);
		}
	}

	async getUserInfo(token: string) {
		let info;
		let request = await fetch(`https://api.intra.42.fr/v2/me`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		try {
			info = await request.json();
		}
		catch (err) {
			console.log(err);
		}
		if (info === undefined) {
			return undefined;
		}
		// console.log('-> info', info);
		let data = {
			ClientId: +info.id,
			intra: info.login,
			mail: info.email,
			firstName: info.first_name,
			lastName: info.last_name,
			image: info.image.link,
			token: token,
		}
		// console.log('-> data', data);
		const hey = await this.usersService.createUser(data.ClientId, data.firstName, data.lastName, data.intra, data.mail, data.image, token);
		// console.log('-> user created', data)
		return data;
	}

	async login(code: string) {
		let response = await this.authenticateUser(code);
		let token = response.access_token;
		let user = await this.getUserInfo(token);
		// console.log('-> user', user);
		let jwt = this.jwtService.sign(user);
		return {
			access_token: jwt,
		};
	}
}