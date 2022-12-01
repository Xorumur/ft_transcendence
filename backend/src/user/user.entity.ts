import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
// import { Entity } from 'typeorm/decorator/entity/Entity';
// Here the class of the user entity.
@Entity() 
export class User {
	@PrimaryGeneratedColumn()
    id: number

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
	// Profile picture
	// @Column()
	// url: string

	constructor(
		id: number,
		firstName: string,
		lastName: string,
		intra: string,
		mail: string,
		image: string,
	  ) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.intra = intra;
		this.mail = mail;
		this.image = image;
	  }
}

// export default User;

