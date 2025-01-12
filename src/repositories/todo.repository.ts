import { ITodoRepository } from "../interfaces/ITodoRepository";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TodoItemDto } from "src/interfaces/TodoItemDto";

@injectable()
export default class TodoRepository implements ITodoRepository {
  constructor(@inject("PrismaClient") private readonly prisma: PrismaClient) {}

  public async getAllTodos(): Promise<TodoItemDto[]> {
    return await this.prisma.todoItem.findMany();
  }

  public async getTodoById(id: number): Promise<TodoItemDto | null> {
    return await this.prisma.todoItem.findUnique({
      where: { id: id },
    });
  }

  public async createTodo(todo: TodoItemDto): Promise<TodoItemDto> {
    return await this.prisma.todoItem.create({
      data: {
        description: todo.description!,
        completed: todo.completed || false,
        dueDate: todo.dueDate,
      },
    });
  }
  public async updateTodo(
    id: number,
    todo: Partial<TodoItemDto>
  ): Promise<TodoItemDto | null> {
    return await this.prisma.todoItem.update({
      where: {
        id: Number(id),
      },
      data: {
        description: todo.description,
        completed: todo.completed,
        dueDate: todo.dueDate,
      },
    });
  }

  public async deleteTodo(id: number): Promise<void> {
    await this.prisma.todoItem.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
