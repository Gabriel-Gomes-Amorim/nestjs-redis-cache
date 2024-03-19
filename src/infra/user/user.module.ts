import { Module } from '@nestjs/common';
import { UserService } from '../../domain/user/service/user.service';
import { UserController } from './http/user.controller';
import { UserRepository } from './repository/user.repository';
import { PrismaModule } from '../database/prisma.module';
import { RedisService } from '../database/redis/redis';
import { RedisUserRepository } from './repository/redis/redis.user.repository';
import { PrismaUserRepository } from './repository/prisma/prisma.user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    RedisService,
    RedisUserRepository,
    PrismaUserRepository,
    { provide: UserRepository, useClass: RedisUserRepository },
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
