import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";
import supertest from "supertest";
import { serverConfig, serverErrorConfig, container } from "../src/config";
import { TodoItemDto } from "../src/interfaces/TodoItemDto";
import { PrismaClient } from "@prisma/client/extension";
import { compileFunction } from "vm";

let server: any;
let prisma: PrismaClient;
beforeAll(() => {
  const app = new InversifyExpressServer(container);
  app.setConfig(serverConfig);
  app.setErrorConfig(serverErrorConfig);
  server = app.build().listen();
  prisma = container.get("PrismaClient");
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
  it("should return validation errors when creating", async () => {
    const response = await supertest(server).post("/todos/");
    expect(response.status).toBe(422);
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0]).toEqual({
      location: "body",
      msg: "Invalid value",
      path: "description",
      type: "field",
    });
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
  it("should return a Todo", async () => {
    const todo = await prisma.todoItem.create({
      data: {
        description: "Test Todo for get by id",
      },
    });
    const response = await supertest(server).get("/todos/" + todo.id);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.id).toEqual(todo.id);
  });
  it("should change the description", async () => {
    const todo = await prisma.todoItem.create({
      data: {
        description: "Update test",
      },
    });
    const response = await supertest(server)
      .put("/todos/" + todo.id)
      .send({ description: "Update test works" })
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.id).toEqual(todo.id);
    expect(response.body.description).not.toEqual(todo.description);
  });
  it("should return validation errors when updating", async () => {
    const todo = await prisma.todoItem.create({
      data: {
        description: "Should not update",
      },
    });
    const response = await supertest(server)
      .put("/todos/" + todo.id)
      .send({ description: "" })
      .set("Accept", "application/json");
    expect(response.status).toBe(422);
    expect(response.body.errors).toBeInstanceOf(Array);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0]).toEqual({
      location: "body",
      msg: "Invalid value",
      path: "description",
      type: "field",
      value: "",
    });
  });
  it("should delete todo", async () => {
    const todo = await prisma.todoItem.create({
      data: {
        description: "To be deleted",
      },
    });
    const response = await supertest(server).delete("/todos/" + todo.id);
    expect(response.status).toBe(200);
  });
});
