import { User } from '../entity/user';

export abstract class UserRepository {
  abstract findMany(): Promise<User[]>;
}
