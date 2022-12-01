import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from '../../app.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from './google.service';
import { AppModule } from 'src/app.module';

@Controller('google')
export class GoogleController {
  constructor(private readonly GoogleService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
	console.log('test')
	const Info = this.GoogleService.googleLogin(req);
	console.log('Info ->', Info);
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
	const userInfo = this.GoogleService.googleLogin(req);
    return userInfo;
  }
}