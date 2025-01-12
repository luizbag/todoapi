import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { ITodoService } from "../interfaces/ITodoService";
import { inject } from "inversify";
import { TodoItemDto } from "../interfaces/TodoItemDto";
import { ILogger } from "../interfaces/ILogger";
import { body } from "express-validator";
import { RequestValidator } from "../config/validation.config";

@controller("/todos")
export default class TodoController extends BaseHttpController {
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

  @httpGet("/:id")
  public async findById(@requestParam("id") id: number) {
    const item = await this.todoService.getTodoItemById(Number(id));
    return item;
  }

  @httpPost("", body("description").notEmpty(), RequestValidator)
  public async create(@requestBody() todoItem: TodoItemDto) {
    const todo = await this.todoService.createTodoItem(todoItem);

    return todo;
  }

  @httpPut("/:id", body("description").notEmpty(), RequestValidator)
  public async update(
    @requestParam("id") id: number,
    @requestBody() todoItem: TodoItemDto
  ) {
    const todo = await this.todoService.updateTodoItem(id, todoItem);
    return todo;
  }

  @httpDelete("/:id")
  public async delete(@requestParam("id") id: number) {
    await this.todoService.deleteTodoItem(id);
    return this.ok();
  }
}
