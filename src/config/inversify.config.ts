import { Container } from "inversify";
import { Logger } from "./logger.config";

import "../controllers/todo.controller";
import TodoService from "../services/todo.service";
import TodoRepository from "../repositories/todo.repository";
import { PrismaClient } from "@prisma/client";

const container = new Container({ autoBindInjectable: true });

container.bind("ILogger").to(Logger).inSingletonScope();
container.bind("PrismaClient").toConstantValue(new PrismaClient());
container.bind("ITodoRepository").to(TodoRepository).inSingletonScope();
container.bind("ITodoService").to(TodoService).inSingletonScope();
export { container };
