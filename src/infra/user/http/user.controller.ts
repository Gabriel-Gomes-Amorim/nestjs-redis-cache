import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { UserService } from '../../../domain/user/service/user.service';
import { Request, Response } from 'express';
import { User } from '../entity/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Res() res: Response, @Req() req: Request): Promise<Response> {
    try {
      const users: User[] | null = await this.userService.getUsers();
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'erro ao buscar usuários!', error: error.message });
    }
  }
}
