import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { HttpService } from '@nestjs/axios';
import { UsersService } from '../user/user.service';
import axios from 'axios';
import fetch from 'node-fetch';

@Injectable()
export class ChatService {
	constructor(private readonly UserService: UsersService) {}
}
