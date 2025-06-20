import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
}
