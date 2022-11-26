import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

// Here the class of the user entity. 
export abstract class User {
	@PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

	@Column()
	intra: string

	// Profile picture
	@Column()
	url: string
}