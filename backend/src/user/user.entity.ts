import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
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
	history: History[]

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

@Entity()
export class History {
	@PrimaryGeneratedColumn()
	id: number

	@CreateDateColumn()
	time: Date

	@Column()
	opponent: string

	@Column()
	winner: string

	@ManyToOne(type => User, user => user.history)
	@JoinColumn({ name: 'userId' })
	user: User

	constructor(opponent: string, winner: string) {
		this.opponent = opponent;
		this.winner = winner;
	}
}