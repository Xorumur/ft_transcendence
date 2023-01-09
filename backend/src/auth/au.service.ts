import { Injectable, Res } from '@nestjs/common';
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
		return await this.usersService.findOne(id);
	}


	async log42(code : string) {
		console.log('-> USER_ID',process.env.USER_ID);
		console.log('-> USER_SECRET',process.env.USER_SECRET);
		console.log('-> code', code);
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
			let tok =  await token.json();

			return tok;
		}
		catch (err) {
			console.log(err);
		}
		return null;
	}

	async StoreUser(token : string) {
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
			return null;
		}
		if (info === undefined) {
			return undefined;
		}
		// console.log('-> info', info);
		let data = { 
			UserId : +info.id,
			Intra : info.login,
			Email : info.email,
			FirstName : info.first_name,
			LastName : info.last_name,
			ImageUrl : info.image.link,
			token : token,
		}
		// console.log('-> data', data);
		await this.usersService.createUser(data.UserId, data.FirstName, data.LastName, data.Intra, data.Email, data.ImageUrl, token);
		// console.log('-> user created', data)
		return data;
	}

//   async login(code : string)  {
// 	let response = await this.authenticateUser(code);
// 	let token = response.access_token;
// 	let user = await this.getUserInfo(token);
// 	// console.log('-> user', user);
// 	let jwt;
// 	try {
// 		jwt = this.jwtService.sign(user);
// 	} catch (err) {
// 		// console.log(err);
// 		// resp.status(401).send('Unauthorized');
// 		return null;
// 	}
//     return {
//       access_token: jwt,
//     };
//   }

	async auth(code : string, resp : any) {
		let resp42 = await this.log42(code);
		console.log('-> resp42', resp42);
		let token = resp42.access_token;
		// console.log('-> access', resp42.access_token);
		console.log('-> token', token);
		if (!token || token === undefined) {
			resp.status(401).send('Unauthorized');
			return null;
		}
		let user = await this.StoreUser(token);
		console.log('-> user', user);
		if (!user || user === undefined) {
			resp.status(401).send('Unauthorized');
			return null;
		}
		
		let jwt : any;
		try {
			jwt = this.jwtService.sign(user);
		}	catch (err) {
			console.log(err);
			resp.status(401).send('Unauthorized');
			return null;
		}
		console.log('-> jwt', jwt);
		return jwt;
	}
}