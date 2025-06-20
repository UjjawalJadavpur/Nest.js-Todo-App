import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(username: string, email: string, password: string): Promise<User> {
    const user = this.usersRepo.create({ username, email, password });
    return this.usersRepo.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }
}
