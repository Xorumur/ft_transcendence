import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthModule } from './auth.module';
import { User } from '../user/user.entity';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import axios from 'axios';
import fetch from 'node-fetch';

@Injectable()
export class AuthService {
	// constructor(
	// @InjectRepository(User)
	// 	private usersRepository: Repository<User>,
	// ) {}
	constructor(private readonly httpService: HttpService) {}
	
	async authenticateUser(code : string, host : string) : Promise<any> {
		// console.log('code ->', code);
		// const url = 'https://api.intra.42.fr/oauth/token';
		// const data = {
		// 	"grant_type": 'authorization_code',
		// 	"client_id": process.env.USER_ID,
		// 	"client_secret": process.env.USER_SECRET,
		// 	"code": code,
		// 	"redirect_uri": `http://${host}:3000/`,
		// };
		// let token = await axios.post(url, data);
		// token = token.data;
		// console.log('token ->', token);

		console.log('-> USER_ID',process.env.USER_ID);
		console.log('-> USER_SECRET',process.env.USER_SECRET);
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
		return await token.json();
		// // token = token.json;
		// console.log('-> token', token);
		// let request = await fetch('https://api.intra.42.fr/v2/me', {
		// 	method: 'GET',
		// 	headers: {
		// 		'Authorization': `Bearer ${token.access_token}`,
		// 		'Content-Type': 'application/json',
		// 	},
		// }, 2000);
		// console.log('-> request', request);
	}

	async getUserInfo(token : string) {
		let request = await fetch(`https://api.intra.42.fr/v2/users/${token}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		return await request.json();
	}
}
