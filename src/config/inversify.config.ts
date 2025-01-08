import { Container } from "inversify";
import { Logger } from "./logger.config";

import "../controllers/todo.controller";

const container = new Container({ autoBindInjectable: true });

container.bind("ILogger").to(Logger).inRequestScope();
export { container };
