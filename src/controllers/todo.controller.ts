import {
  BaseHttpController,
  controller,
  httpGet,
} from "inversify-express-utils";

@controller("/todos")
export class TodoController extends BaseHttpController {
  @httpGet("/")
  public async findAll() {
    return this.json({ message: "Hello World" });
  }
}
