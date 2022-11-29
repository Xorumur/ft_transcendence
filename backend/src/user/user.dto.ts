// import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

	// @IsNotEmpty()
	id: number;

	// @IsNotEmpty()
	// @MinLength(1)
	firstName: string;

	// @IsNotEmpty()
	// @MinLength(1)
	lastName: string;

	// @IsNotEmpty()
	// @MinLength(1)
	intra: string;

//   @IsNotEmpty()
//   @IsEmail()
//   email: string;
}