import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepo: Repository<Todo>,
    private usersService: UsersService
  ) {}

  async findAll(userId: number) {
    return this.todosRepo.find({ where: { user: { id: userId } } });
  }

  async create(userId: number, text: string) {
    const user = await this.usersService.findById(userId);
    const todo = this.todosRepo.create({ text, user });
    return this.todosRepo.save(todo);
  }

  async update(id: number, text: string, userId: number) {
    const todo = await this.todosRepo.findOne({ where: { id, user: { id: userId } } });
    if (!todo) return null;
    todo.text = text;
    return this.todosRepo.save(todo);
  }

  async toggle(id: number, userId: number) {
    const todo = await this.todosRepo.findOne({ where: { id, user: { id: userId } } });
    if (!todo) return null;
    todo.completed = !todo.completed;
    return this.todosRepo.save(todo);
  }

  async delete(id: number, userId: number) {
    const todo = await this.todosRepo.findOne({ where: { id, user: { id: userId } } });
    if (!todo) return null;
    return this.todosRepo.remove(todo);
  }
}
