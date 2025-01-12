import { inject, injectable } from "inversify";
import { ITodoService } from "../interfaces/ITodoService";
import { ITodoRepository } from "../interfaces/ITodoRepository";
import { TodoItemDto } from "../interfaces/TodoItemDto";
import {
  BadRequestException,
  InternalServerException,
  Logger,
  ValidationException,
} from "../config";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

@injectable()
export default class TodoService implements ITodoService {
  constructor(
    @inject("ITodoRepository") private readonly repository: ITodoRepository,
    @inject("ILogger") private readonly log: Logger
  ) {}

  public async createTodoItem(item: TodoItemDto): Promise<TodoItemDto | null> {
    try {
      const newItem = await this.repository.createTodo(item);

      return newItem;
    } catch (error) {
      this.log.error("Error creating todo item:", error);
      if (error instanceof PrismaClientValidationError)
        throw new BadRequestException("Invalid request");
      throw new InternalServerException("Error creating todo item: " + error);
    }
  }

  public async getTodoItemById(id: number): Promise<TodoItemDto | null> {
    try {
      const item = await this.repository.getTodoById(id);
      return item;
    } catch (error) {
      this.log.error("Error retrieving todo item by id:", error);
      return null;
    }
  }

  public async updateTodoItemStatus(
    id: number,
    status: boolean
  ): Promise<TodoItemDto | null> {
    try {
      const updatedItem = await this.repository.updateTodoStatus(id, status);
      return updatedItem;
    } catch (error) {
      console.error("Error updating todo item status:", error);
      return null;
    }
  }

  public async getAllTodoItems(): Promise<TodoItemDto[]> {
    try {
      const items = await this.repository.getAllTodos();
      const dtoItems = (
        await Promise.all(
          items.map(async (i) => {
            return i;
          })
        )
      ).filter((item): item is TodoItemDto => item !== null);
      return dtoItems;
    } catch (error) {
      console.error("Error retrieving all todo items:", error);
      throw new Error("Could not retrieve todo items");
    }
  }

  public async updateTodoItem(
    id: number,
    item: TodoItemDto
  ): Promise<TodoItemDto | null> {
    try {
      const updatedItem = await this.repository.updateTodo(id, item);
      return updatedItem;
    } catch (error) {
      console.error("Error updating todo item:", error);
      return null;
    }
  }

  public async deleteTodoItem(id: number): Promise<void> {
    try {
      await this.repository.deleteTodo(id);
    } catch (error) {
      console.error("Error deleting todo item:", error);
      throw new Error("Could not delete todo item");
    }
  }
}
