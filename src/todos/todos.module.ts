import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { UsersModule } from 'src/users/users.module';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UsersModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
