import { inject, injectable } from "inversify";
import { ITodoService } from "../interfaces/ITodoService";
import { ITodoRepository } from "../interfaces/ITodoRepository";
import { TodoItemDto } from "../interfaces/TodoItemDto";
import {
  BadRequestException,
  InternalServerException,
  Logger,
  NotFoundException,
} from "../config";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

@injectable()
export default class TodoService implements ITodoService {
  constructor(
    @inject("ITodoRepository") private readonly repository: ITodoRepository,
    @inject("ILogger") private readonly log: Logger
  ) {}

  public async createTodoItem(item: TodoItemDto): Promise<TodoItemDto> {
    try {
      const newItem = await this.repository.createTodo(item);

      return newItem;
    } catch (error) {
      this.log.error("Error creating todo item:", error);
      if (error instanceof PrismaClientValidationError)
        throw new BadRequestException("Invalid request");
      throw new InternalServerException("Error creating todo item");
    }
  }

  public async getTodoItemById(id: number): Promise<TodoItemDto> {
    try {
      const item = await this.repository.getTodoById(id);
      if (item === null)
        throw new NotFoundException("Not found todo with id: " + id);
      return item;
    } catch (error) {
      this.log.error("Error retrieving todo item by id:" + id, error);
      throw new InternalServerException("Error getting todo item: " + id);
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
      this.log.error("Error retrieving all todo items:", error);
      throw new InternalServerException("Could not retrieve todo items");
    }
  }

  public async updateTodoItem(
    id: number,
    item: TodoItemDto
  ): Promise<TodoItemDto> {
    try {
      const updatedItem = await this.repository.updateTodo(id, item);
      if (updatedItem === null)
        throw new NotFoundException("Not found todo with id: " + id);
      return updatedItem;
    } catch (error) {
      this.log.error("Error updating todo item:" + id, error);
      throw new InternalServerException("Error updating todo item: " + id);
    }
  }

  public async deleteTodoItem(id: number): Promise<void> {
    try {
      await this.repository.deleteTodo(id);
    } catch (error) {
      this.log.error("Error deleting todo item:" + id, error);
      throw new InternalServerException("Error deleting todo item: " + id);
    }
  }
}
