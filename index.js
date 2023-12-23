// Import external packages
const { error } = require("./src/lib-handler");
const express = require("express");
const treblle = require("@treblle/express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./src/doc/swagger.json");
const logger = require("morgan");
const mongoose = require("mongoose");

const { connectToMongoDb, environmentVariables } = require("./src/config");
const apiRoutes = require("./src/routes");

const app = express();
app.use(logger("dev"));

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(
//   treblle({
//     apiKey: process.env.TREBLLE_API_KEY,
//     projectId: process.env.TREBLLE_PROJECT_ID,
//     additionalFieldsToMask: [],
//   })
// );

app.use(helmet());
app.use(
  helmet({
    frameguard: {
      action: "deny",
    },
  })
);

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60,
});

app.use(limiter);

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.get("/api/v1/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJson);
});

console.log(
  `Version 1 Docs are available on http://localhost:${environmentVariables.APP_PORT}/api/v1/docs`
);

const setAllowHeader = (req, res, next) => {
  res.setHeader("Allow", "GET, POST, PUT, DELETE");
  next();
};

app.use(setAllowHeader);

app.get("/", (req, res) => {
  res.send({ message: "todo API working fine now" });
});

app.use("/api/v1", apiRoutes);

app.use(error.handler);

// const main = async () => {
//   console.info("Starting server");
//   await connectToMongoDb();
//   console.info("Connected to MongoDB");
//   app.listen(environmentVariables.APP_PORT || 8000, (err) => {
//     try {
//       console.info(
//         `Server running on ${environmentVariables.APP_HOST}:${environmentVariables.APP_PORT}`
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   });
// };

// main();

const connectToMongo = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.once("open", () => {
      console.info("Connected to MongoDB");
      resolve();
    });

    mongoose.connection.on("error", (error) => {
      console.log(error);
      reject(error);
    });

    connectToMongoDb();
  });
};

const startServer = () => {
  app.listen(environmentVariables.APP_PORT || 8000, (err) => {
    try {
      console.info(
        `Server running on ${environmentVariables.APP_HOST}:${environmentVariables.APP_PORT}`
      );
    } catch (error) {
      console.log(error);
    }
  });
};

const main = async () => {
  console.info("Starting server");

  try {
    await connectToMongo();
    startServer();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

main();

module.exports = app;
