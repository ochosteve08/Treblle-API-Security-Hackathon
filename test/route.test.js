const request = require("supertest");
const app = require("../index");
require("dotenv").config();
const mongoose = require("mongoose");

let userId;
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
  if (userId) {
    console.log("Attempting to delete user with ID:", userId);
    const users = await mongoose.connection
      .collection("users")
      .deleteOne({ _id: userId });
    console.log("Deleted test user from the database:", users);
  }
  await mongoose.connection.close();
  console.log("Disconnected from test database");
});

describe("TODOS API", () => {
 

  it("should return an error when registering user with invalid email format", async function () {
    const registerResponse = await request(app)
      .post("/api/v1/users/register")
      .send({
        email: "invalid_email",
        password: "Professor-08",
      });
    expect(registerResponse.status).toBe(400);
    console.log(registerResponse.body.error.fields[0].message);
    expect(
      registerResponse.body.error.fields[0].message.replace(/\"/g, "")
    ).toBe("Email must be a valid email");
  });

  it("should return an error when logging in with incorrect password", async function () {
    const loginResponse = await request(app).post("/api/v1/users/login").send({
      email: "tester@gmail.com",
      password: "incorrect_password",
    });
    expect(loginResponse.status).toBe(400);
    console.log(loginResponse.body.error.fields[0].message);
    
  });

  it("should return an error when creating todo without title", async function () {
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
        description: "happy day",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(createTodoResponse.status).toBe(400);

    expect(
      createTodoResponse.body.error.fields[0].message.replace(/\"/g, "")
    ).toBe("Title is required");
  });

  it("should retrieve todos", async function () {
    const loginResponse = await request(app).post("/api/v1/users/login").send({
      email: "tester@gmail.com",
      password: "Professor-08",
    });
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.data).toHaveProperty("token");
    expect(loginResponse.body.data).toHaveProperty("user");
    const token = loginResponse.body.data.token;

    const retrieveTodosResponse = await request(app)
      .get("/api/v1/todos")
      .set("Authorization", `Bearer ${token}`);
    expect(retrieveTodosResponse.status).toBe(200);
    expect(retrieveTodosResponse.body.data.todos).toBeDefined();
  });

  it("should return an error when trying to delete a non-existent todo without authentication", async function () {
    const token = "valid_token";
    const todoId = "non_existent_todo_id";

    const deleteTodoResponse = await request(app)
      .delete(`/api/v1/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteTodoResponse.status).toBe(403);
    expect(deleteTodoResponse.body.error.message).toBe("jwt malformed");
  });

  

  it("should return an error when updating todo with incomplete data", async function () {
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

    const updateTodoResponse = await request(app)
      .put(`/api/v1/todos/${todoId}`)
      .send({
        title: "updated item",
        completed: false,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(updateTodoResponse.status).toBe(400);
    expect(
      updateTodoResponse.body.error.fields[0].message.replace(/\"/g, "")
    ).toBe("Description is required");

    const cleanupResponse = await request(app)
      .delete(`/api/v1/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(cleanupResponse.status).toBe(200);
  });

  it("should return an error when registering with existing email", async function () {
    const registerResponse = await request(app)
      .post("/api/v1/users/register")
      .send({
        email: "tester@gmail.com",
        password: "Professor-08",
      });
    expect(registerResponse.status).toBe(409);
    expect(registerResponse.body.error.message).toBe("Email already in use");
  });

  it("should return an error when logging in with invalid credentials", async function () {
    const loginResponse = await request(app).post("/api/v1/users/login").send({
      email: "invalid@gmail.com",
      password: "invalidpassword",
    });
    expect(loginResponse.status).toBe(400);
 
  });




});
