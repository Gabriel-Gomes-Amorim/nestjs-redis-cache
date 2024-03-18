import { Module } from '@nestjs/common';
import { UserService } from '../../domain/user/service/user.service';
import { UserController } from './http/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
