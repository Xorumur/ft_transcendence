import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Chat {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column()
	email: string;

	@Column({ unique: true })
	text: string;

	@CreateDateColumn()
	createdAt: Date;
}

// Here the class of the user entity.
// @Entity() 
// export class ChatRoom {
// 	@PrimaryGeneratedColumn()
//     chatId: number

// 	@Column()
// 	chatName: string

// 	@Column()
// 	password: string;

// 	@Column()
// 	history: string[] = [];

// 	@Column()
// 	Members: User[];

// 	constructor(
// 		id: number,
// 		Name: string,
// 		password: string,
// 	  ) {
// 		this.chatId = id;
// 		this.chatName = Name;
// 		this.password = password;
// 	  }
// }