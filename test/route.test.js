const request = require("supertest");
const app = require("../index");
// const { connectToMongoDb } = require("../src/config");

describe("TODOS API", () => {
//     beforeAll(async () => {
//       try {
//         await connectToMongoDb();
//         console.info("Connected to MongoDB");
//       } catch (error) {
//         console.error("Error in connecting to MongoDB", error);
//         process.exit(1);
//       }
//     });

   it("GET /test should return a status code of 200", async () => {
     const response = await request(app).get("/test");
     expect(response.status).toBe(200);
   });
});
