import { Injectable } from '@nestjs/common';
import { User } from 'src/infra/user/entity/user';
import { UserRepository } from 'src/infra/user/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(): Promise<User[] | null> {
    return await this.userRepository.findMany();
  }
}
