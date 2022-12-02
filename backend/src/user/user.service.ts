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

	// findOne(id: number): Promise<User> {
	// 	return this.usersRepository.findOneBy({ id });
	// }

	findOneByIntra(intra: string): Promise<User> {
		return this.usersRepository.findOneBy({ intra });
	}

	// findOneByCode(code: string): Promise<User> {
	// 	return this.usersRepository.findOneBy({ code });
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
		CID : number,
		fN : string, 
		lN : string, 
		intra : string,
		mail : string,
		image : string,
		token : string
		) {
		// console.log(CreateUserDto);
		console.log('Contructor : ', id, fN, lN, intra);
		const newUser: User = new User(id, CID, fN, lN, intra, mail, image, token);
		console.log(newUser);
		await this.usersRepository.save(newUser);
		// console.log('-> Display by id ', await this.displayUserId(0));
		// console.log('-> Display by intra ', await this.displayUserIntra('mlecherb'));
		// console.log('-> Display all ', await this.findAll());
		return newUser;
	}

	async getImg(id : number) {
		const user = await this.usersRepository.findOneBy({ UserId: id });
		return user.image;
	}

	async displayUserId(id : number) {
		const user = await this.usersRepository.findOneBy({ UserId: id });
		return user;
	}

	async displayUserIntra(intra : string) {
		const user = await this.usersRepository.findOneBy({ intra: intra });
		return user;
	}

	async remove(id: string): Promise<void> {
		await this.usersRepository.delete(id);
	}
}
