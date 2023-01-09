import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class History {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	time: Date;

	@Column()
	winner: string;

	@Column()
	opponent: string;

	@Column()
	gameMode: number;

	@ManyToOne(type => User, user => user.history)
	@JoinColumn({ name: 'userId' })
	user: User;

	constructor(winner: string, opponent: string, gameMode: number) {
		this.winner = winner;
		this.opponent = opponent;
		this.gameMode = gameMode;
	}
}