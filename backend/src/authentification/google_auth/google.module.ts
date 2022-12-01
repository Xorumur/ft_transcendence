import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';
import { GoogleService} from './google.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleController } from './google.controller';

@Module({
	  imports: [],
	  providers: [GoogleService, GoogleStrategy],
	  controllers: [GoogleController],
	//   exports: [],
})

export class GoogleModule {}