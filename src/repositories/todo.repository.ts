import { AppOrm } from "../libs";
import { ITodoRepository } from "../interfaces/ITodoRepository";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TodoItemDto } from "src/interfaces/TodoItemDto";

@injectable()
export default class TodoRepository implements ITodoRepository {
  private _client: PrismaClient;

  constructor(@inject("AppOrm") private readonly appOrm: AppOrm) {
    this._client = appOrm.getClient();
  }

  public async getAllTodos(): Promise<TodoItemDto[]> {
    return this._client.todoItem.findMany();
  }
  public async getTodoById(id: number): Promise<TodoItemDto | null> {
    return this._client.todoItem.findUnique({
      where: { id },
    });
  }
  public async createTodo(todo: TodoItemDto): Promise<TodoItemDto> {
    return this._client.todoItem.create({
      data: {
        description: todo.description!,
        completed: todo.completed || false,
        dueDate: todo.dueDate,
      },
    });
  }
  updateTodo(
    id: number,
    todo: Partial<TodoItemDto>
  ): Promise<TodoItemDto | null> {
    throw new Error("Method not implemented.");
  }
  updateTodoStatus(id: number, status: boolean): Promise<TodoItemDto | null> {
    throw new Error("Method not implemented.");
  }
  deleteTodo(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
