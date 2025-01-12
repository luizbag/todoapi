import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
} from "inversify-express-utils";
import { ITodoService } from "../interfaces/ITodoService";
import { inject } from "inversify";
import { TodoItemDto } from "../interfaces/TodoItemDto";
import { ILogger } from "../interfaces/ILogger";
import { body } from "express-validator";
import { RequestValidator } from "../config/validation.config";

@controller("/todos")
export class TodoController extends BaseHttpController {
  constructor(
    @inject("ITodoService") private readonly todoService: ITodoService,
    @inject("ILogger") private readonly log: ILogger
  ) {
    super();
  }

  @httpGet("")
  public async findAll(): Promise<Array<TodoItemDto>> {
    const items = await this.todoService.getAllTodoItems();
    return items;
  }

  @httpPost("", body("description").notEmpty(), RequestValidator)
  public async create(@requestBody() todoItem: TodoItemDto) {
    const todo = this.todoService.createTodoItem(todoItem);

    return todo;
  }
}
