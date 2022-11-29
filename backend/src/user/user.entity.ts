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

	// Profile picture
	// @Column()
	// url: string

	constructor(
		id: number,
		fN: string,
		lN: string,
		intra: string
	  ) {
		this.id = id;
		this.firstName = fN;
		this.lastName = lN;
		this.intra = intra;
	  }
}

// export default User;

