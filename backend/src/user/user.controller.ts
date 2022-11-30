import { Controller, Get, Post , Body, ValidationPipe, UsePipes} from '@nestjs/common';
import { get } from 'http';
import { UsersService } from './user.service';
import { Request } from 'express';
import { User } from './user.entity';
import {CreateUserDto} from './user.dto'


@Controller()
export class UsersController {
	constructor(private readonly UsersService: UsersService) {}

	@Get('test')
	getHello(): string {
		return this.UsersService.getHello();
	}
	
	// This is how to get the json body of the request.
	@Post('new')
	@UsePipes(ValidationPipe)
	async addUser(
		@Body('id') id : number,
		@Body('firstName') fN : string,
		@Body('lastName') lN : string,
		@Body('intra') intra: string
		) {
		console.log(id, fN, lN, intra);
		await this.UsersService.createUser(id, fN, lN, intra);
	}

	// @Get('db')
	// getName() : string {
	// 	return this.UsersService.findOneByIntra('mlecherb');
	// }

  
}
