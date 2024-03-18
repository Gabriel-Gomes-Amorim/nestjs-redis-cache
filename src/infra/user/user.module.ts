import { Module } from '@nestjs/common';
import { UserService } from '../../domain/user/service/user.service';
import { UserController } from './http/user.controller';
import { UserRepository } from './repository/user.repository';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
