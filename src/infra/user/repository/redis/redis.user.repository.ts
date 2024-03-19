import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/infra/database/redis/redis';
import { User } from '../../entity/user';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserRepository } from '../user.repository';
import { PrismaUserRepository } from '../prisma/prisma.user.repository';

@Injectable()
export class RedisUserRepository implements UserRepository {
  constructor(
    private readonly redis: RedisService,
    private readonly prismaUserRepository: PrismaUserRepository,
  ) {}

  async findMany(): Promise<User[]> {
    const cachedUsers = await this.redis.get('users');

    if (!cachedUsers) {
      const users = await this.prismaUserRepository.findMany();

      await this.redis.set('users', JSON.stringify(users), 'EX', 15);

      console.log('\x1b[33m%s\x1b[0m', 'From Database');

      return users;
    }
    console.log('\x1b[36m%s\x1b[0m', 'From Cache');

    return JSON.parse(cachedUsers);
  }
}
