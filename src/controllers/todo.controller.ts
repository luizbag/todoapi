import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
} from "inversify-express-utils";
import { BadRequestException } from "../config";
import { ITodoService } from "src/interfaces/ITodoService";
import { inject } from "inversify";
import { TodoItemDto } from "src/interfaces/TodoItemDto";
import { ILogger } from "src/interfaces/ILogger";

@controller("/todos")
export class TodoController extends BaseHttpController {
  constructor(
    @inject("ITodoService") private readonly todoService: ITodoService,
    @inject("ILogger") private readonly log: ILogger
  ) {
    super();
  }

  @httpGet("/")
  public async findAll(): Promise<Array<TodoItemDto>> {
    const items = await this.todoService.getAllTodoItems();
    return items;
  }

  @httpPost("/")
  public async create(@requestBody() todoItem: TodoItemDto) {
    this.log.info("Request: " + todoItem);
    if (todoItem === null || todoItem === undefined)
      this.badRequest("Missing request body");

    const todo = this.todoService.createTodoItem(todoItem);

    return todo;
  }
}
