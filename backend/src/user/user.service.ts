import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
		return this.usersRepository.findOneBy({ ClientId: id})
	}

	findOneByIntra(intra: string): Promise<User> {
		return this.usersRepository.findOneBy({ intra : intra});
	}

	findOneByOption(option: string, content : string): Promise<User> {
		return this.usersRepository.findOneBy({firstName: content});
	}

	async  createUser(
		id : number,
		CID : number,
		fN : string, 
		lN : string,
		intra : string,
		mail : string,
		image : string,
		token : string
		) {
		const newUser: User = new User(id, CID, fN, lN, intra, mail, image, token);
		const verifUser = await this.usersRepository.findOneBy({ ClientId: CID });
		if (verifUser !== undefined)
		{
			// delete the user and change it with the verifUser
			await this.usersRepository.delete(verifUser.UserId);
		}
		await this.usersRepository.save(newUser);
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
