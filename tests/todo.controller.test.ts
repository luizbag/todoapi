import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";
import supertest from "supertest";
import { serverConfig, serverErrorConfig, container } from "../src/config";
import { TodoItemDto } from "../src/interfaces/TodoItemDto";

let server: any;
beforeAll(() => {
  const app = new InversifyExpressServer(container);
  app.setConfig(serverConfig);
  app.setErrorConfig(serverErrorConfig);
  server = app.build().listen();
});

afterAll((done) => {
  server.close(done);
});

describe("TodoController", () => {
  it("should return an array of todo items", async () => {
    const response = await supertest(server).get("/todos/");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array<TodoItemDto>);
  });
  it("should create a new todo", async () => {
    const newTodo: TodoItemDto = {
      id: null,
      description: "Test Todo",
      completed: false,
      dueDate: null,
    };
    const response = await supertest(server)
      .post("/todos/")
      .send(newTodo)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.id).not.toBeNull();
  });
  it("should throw an error if request body is empty", async () => {
    const response = await supertest(server).post("/todos/");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid request",
      type: "Bad Request",
    });
  });
});
