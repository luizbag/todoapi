import "reflect-metadata";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import supertest from "supertest";
import { TodoController } from "../src/controllers/todo.controller";

let server: any;
beforeAll(() => {
  const container = new Container();
  container.bind<TodoController>(TodoController).toSelf();
  const app = new InversifyExpressServer(container).build();
  server = app.listen(3000);
});

afterAll(() => {
  server.close();
});

describe("TodoController", () => {
  it("should return Hello World message", async () => {
    const response = await supertest(server).get("/todos/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello World" });
  });
});
