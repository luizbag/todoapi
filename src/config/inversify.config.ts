import { Container } from "inversify";
import { Logger } from "./logger.config";

import "../controllers/todo.controller";
import TodoService from "../services/todo.service";
import { AppOrm } from "../libs";
import TodoRepository from "../repositories/todo.repository";

const container = new Container({ autoBindInjectable: true });

container.bind("ILogger").to(Logger).inSingletonScope();
container.bind("AppOrm").to(AppOrm).inSingletonScope();
container.bind("ITodoRepository").to(TodoRepository).inSingletonScope();
container.bind("ITodoService").to(TodoService).inSingletonScope();
export { container };
