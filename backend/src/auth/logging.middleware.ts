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
		let token = req.headers.authorization.split(' ')[1];
		let payload = this.jwtService.verify(token, { secret: jwtConstants.secret });
		req.user = payload;
        next();
    }
}