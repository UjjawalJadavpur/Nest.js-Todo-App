import { Controller, Get, Post, Body, UseGuards, Request, Delete, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodos(@Request() req) {
    return this.todosService.findAll(req.user.userId);
  }

  @Post()
  create(@Request() req, @Body() body: { text: string }) {
    return this.todosService.create(req.user.userId, body.text);
  }

  @Put()
  update(@Request() req, @Body() body: { id: number; text: string }) {
    return this.todosService.update(body.id, body.text, req.user.userId);
  }

  @Put('toggle')
  toggle(@Request() req, @Body() body: { id: number }) {
    return this.todosService.toggle(body.id, req.user.userId);
  }

  @Delete()
  delete(@Request() req, @Body() body: { id: number }) {
    return this.todosService.delete(body.id, req.user.userId);
  }
}
