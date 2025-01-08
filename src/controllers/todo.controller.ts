import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
} from "inversify-express-utils";
import { ILogger } from "../interfaces/ILogger";
import { BadRequestException } from "../config";

@controller("/todos")
export class TodoController extends BaseHttpController {
  constructor(@inject("ILogger") private logger: ILogger) {
    super();
  }

  @httpGet("/")
  public async findAll() {
    return this.json({ message: "Hello World" });
  }
  @httpPost("/")
  public async create(request: Request) {
    if (
      request.body &&
      request.body.constructor === Object &&
      Object.keys(request.body).length === 0
    )
      throw new BadRequestException("Missing body in request");
    const todo = request.body;
    this.logger.info("Request " + JSON.stringify(request.body));

    return todo;
  }
}
