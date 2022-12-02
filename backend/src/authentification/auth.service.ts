import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthModule } from './auth.module';
import { User } from '../user/user.entity';
import { HttpService } from '@nestjs/axios';
import { UsersService } from 'src/user/user.service';
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
		console.log('-> USER_ID',process.env.USER_ID);
		console.log('-> USER_SECRET',process.env.USER_SECRET);
		// if (this.UsersService.findOneByCode(code)) {
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
			return await token.json();
		}
		catch (err) {
			console.log(err);
		}
		// return await token.json();
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
