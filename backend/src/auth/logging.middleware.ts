import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./auth.constant";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
	) {}
    use(req: Request, res: Response, next: NextFunction) {
		let payload : any;
		let token = req.headers.authorization.split(' ')[1];
		try {
			payload = this.jwtService.verify(token, { secret: jwtConstants.secret });
		} catch (e) {
			res.status(401).send("Unauthorized");
			return;	
		}
		if (payload === undefined || token === undefined) {
			res.status(401).send("Unauthorized");
			return;
		}
		// console.log('-> payload', payload);
		req.user = payload;
        next();
    }
}