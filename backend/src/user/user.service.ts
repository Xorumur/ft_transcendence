import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	constructor(
	@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	findOne(id: number): Promise<User> {
		return this.usersRepository.findOneBy({ id });
	}

	findOneByIntra(intra: string): Promise<User> {
	return this.usersRepository.findOneBy({ intra });
	}

	// async create(user: User): Promise<User> {
	// 	return this.usersRepository.save(user);
	// }

	// async create(createUserDto: CreateUserDto) {
	// 	const user = new User();
	// 	user.id = createUserDto.id;
	// 	user.firstName = createUserDto.firstName;
	// 	user.lastName = createUserDto.lastName;
	// 	user.intra = createUserDto.intra;
	// 	return await this.usersRepository.save(user);
	// }
	
	async createUser(
		id : number, 
		fN : string, 
		lN : string, 
		intra : string
		) {
		// console.log(CreateUserDto);
		const newUser: User = new User(id, fN, lN, intra);
		console.log(newUser);
		await this.usersRepository.save(newUser);
		return newUser;
	}

	async remove(id: string): Promise<void> {
		await this.usersRepository.delete(id);
	}

	getHello(): string {
		return 'Proc';
	}
}
