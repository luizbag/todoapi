import { Container } from "inversify";

import "@controllers/todo.controller";

export const container = new Container({ autoBindInjectable: true });
