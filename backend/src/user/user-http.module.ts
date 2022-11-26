import { Module } from '@nestjs/common';
import { UsersModule } from './user.module';
import { UsersService } from './user.service';
// import { UsersController } from './users.controller';

@Module({
  imports: [UsersModule],
  providers: [UsersService],
  controllers: []
})
export class UserHttpModule {}
