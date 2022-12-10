import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

// Here the class of the user entity.
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

	constructor(
		id: number,
		CID: number,
		firstName: string,
		lastName: string,
		intra: string,
		mail: string,
		image: string,
		token: string
	  ) {
		this.UserId = id;
		this.ClientId = CID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.intra = intra;
		this.mail = mail;
		this.image = image;
		this.token = token; 
	  }
}
