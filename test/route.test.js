const request = require("supertest");
const app = require("../index");
require("dotenv").config();
const mongoose = require("mongoose");

beforeAll(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 50000,
    });
    console.log("Connected to test database");
  } catch (error) {
    console.error("Error connecting to test database:", error);
    process.exit(1);
  }
});

afterAll(async function () {
  await mongoose.connection.close();
  console.log("Disconnected from test database");
});

describe("TODOS API", () => {
  it("GET /test should return a status code of 200", async () => {
    const Response = await request(app).get("/test");
    expect(Response.status).toBe(200);
  });

  it("should Register user, login user, check token and create", async function () {
    const registerResponse = await request(app)
      .post("/api/v1/users/register")
      .send({
        email: "tester@gmail.com",
        password: "Professor-08",
      });
    expect(registerResponse.status).toBe(200);

    const loginResponse = await request(app).post("/api/v1/users/login").send({
      email: "tester@gmail.com",
      password: "Professor-08",
    });
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.data).toHaveProperty("token");
    expect(loginResponse.body.data).toHaveProperty("user");
    const token = loginResponse.body.data.token;

    const createTodoResponse = await request(app)
      .post("/api/v1/todos")
      .send({
        title: "sample item",
        description: "happy day",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(createTodoResponse.status).toBe(200);

    const todoId = createTodoResponse.body.data.todo._id;
    const fetchTodoResponse = await request(app)
      .get(`/api/v1/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(fetchTodoResponse.status).toBe(200);
    expect(fetchTodoResponse.body.data.todo._id).toBe(todoId);

    const updateTodoResponse = await request(app)
      .put(`/api/v1/todos/${todoId}`)
      .send({
        title: "updated item",
        description: "updated description",
        completed: false,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(updateTodoResponse.status).toBe(200);
    expect(updateTodoResponse.body.data.updatedTodo.title).toBe("updated item");
    expect(updateTodoResponse.body.data.updatedTodo.description).toBe(
      "updated description"
    );
    expect(updateTodoResponse.body.data.updatedTodo.completed).toBe(false);

    const cleanupResponse = await request(app)
      .delete(`/api/v1/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(cleanupResponse.status).toBe(200);
  });
});
