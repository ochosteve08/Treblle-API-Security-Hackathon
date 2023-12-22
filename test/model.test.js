const { todoModel } = require("../src/models");
const { UserModel } = require("../src/models");
require("dotenv").config();
const mongoose = require("mongoose");

beforeAll(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
     
    });
    console.log("Connected to test database");
  } catch (error) {
    console.error("Error connecting to test database:", error);

  }
});

afterAll(async function () {
  await mongoose.connection.close();
  console.log("Disconnected from test database");
});


describe("todo schema validate", () => {

  it("should validate todo model schema", async () => {
    const newTodo = new todoModel();

    try {
      await newTodo.validate();
    } catch (error) {
      expect(error.errors.title).toBeDefined();
      expect(error.errors.description).toBeDefined();
    }
  });
});


describe("Testing Item model", () => {
  let sampleItemVal;

  beforeEach(() => {
    sampleItemVal = {
      title: "sample item",
      description: 'happy day',
      userId: "5",
      completed: true,
    };
  });

  it("it should throw an error due to missing fields", async () => {
    const todo = new todoModel();

    try {
      await todo.validate();
    } catch (error) {
      expect(error.errors.title).toBeDefined();
      expect(error.errors.description).toBeDefined();
      expect(error.errors.userId).toBeDefined();
    }
  });
});


afterEach(async () => {
  await UserModel.deleteMany();
});

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

afterEach(async () => {
  await removeAllCollections();
});


afterAll(async () => {
  // Removes the User collection
  await UserModel.drop();
});





async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // This error happens when you try to drop a collection that's already dropped. Happens infrequently.
      // Safe to ignore.
      if (error.message === "ns not found") return;

      // This error happens when you use it.todo.
      // Safe to ignore.
      if (error.message.includes("a background operation is currently running"))
        return;

      console.log(error.message);
    }
  }
}

// Disconnect Mongoose
afterAll(async () => {
  await dropAllCollections();
});



