import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { History } from './history.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	UserId: number
	
	@Column()
	ClientId: number

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column()
	intra: string

	@Column()
	mail: string

	@Column()
	image: string

	@Column()
	token: string

	@OneToMany(type => History, history => history.user)
	history: History[];

	constructor(
		CID: number,
		firstName: string,
		lastName: string,
		intra: string,
		mail: string,
		image: string,
		token: string,
	) {
		this.ClientId = CID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.intra = intra;
		this.mail = mail;
		this.image = image;
		this.token = token;
	}
}