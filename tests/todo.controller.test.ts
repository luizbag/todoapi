import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";
import supertest from "supertest";
import { serverConfig, serverErrorConfig, container } from "../src/config";

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
  it("should return Hello World message", async () => {
    const response = await supertest(server).get("/todos/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello World" });
  });
  it("should create a new todo", async () => {
    // const newTodo = { title: "Test Todo", completed: false };
    // const response = await supertest(server)
    //   .post("/todos/")
    //   .send(newTodo)
    //   .set("Accept", "application/json");
    // expect(response.status).toBe(200);
    // expect(response.body).toMatchObject(newTodo);
  });
  it("should throw an error if request body is empty", async () => {
    const response = await supertest(server).post("/todos/");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Missing body in request",
      type: "Bad Request",
    });
  });
});
