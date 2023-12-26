// Import external packages
const { error } = require("./src/lib-handler");
const express = require("express");
// const treblle = require("@treblle/express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./src/doc/swagger.json");
const log = require("morgan");
const mongoose = require("mongoose");
const { logEvents, logger } = require("./src/middleWare/logger");
const path = require("path");
const { connectToMongoDb, environmentVariables } = require("./src/config");
const apiRoutes = require("./src/routes");

const app = express();
app.use(log("dev"));
app.use(logger);
log.token("id", function getId(req) {
  return req.id;
});
const stream = {
  write: (message) => logEvents(message.trim(), "httpRequest.log"), // Here, 'httpRequest.log' is the file name where you want to store HTTP request logs
};
app.use(
  log(":method :url :status :res[content-length] - :response-time ms", {
    stream,
  })
);
app.set("trust proxy", true);

app.use(express.json());
app.use("/", express.static(path.join(__dirname, ".", "src", "public")));
app.use("/", require("./src/routes/root"));

app.use(
  cors({
    origin: "*",
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
  message: "Too many requests from this IP, Please try again in an hour",
  keyGenerator: (req) => {
    // Use a combination of client IP and another factor as the key
    return (
      req.ip + "-" + (req.headers[`${environmentVariables.X_API_KEY}`] || "")
    ); // Replace 'x-api-key' with the actual header you want to use as an additional factor
  },
});

app.use(limiter);

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.get("/api/v1/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJson);
});

const setAllowHeader = (req, res, next) => {
  res.setHeader("Allow", "GET, POST, PUT, DELETE");
  next();
};

app.use(setAllowHeader);

app.use("/api/v1", apiRoutes);

app.use(error.handler);
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
      console.log(
        `swagger Docs are available on http://localhost:${environmentVariables.APP_PORT}/api/v1/docs`
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
    const errno = error.errno || "N/A";
    const code = error.code || "N/A";
    const codeName = error.codeName || "N/A";
    const syscall = error.syscall || "N/A";
    const hostname = error.hostname || "N/A";
    const ok = error.ok || "N/A";
    const connectionGeneration = error.connectionGeneration || "N/A";
    const errorMessage = `Errno:${errno}\tCode:${code}\tCodeName:${codeName}\tSyscall:${syscall}\tHostname:${hostname}\tOK:${ok}\tConnectionGeneration:${connectionGeneration}\t`;

    logEvents(errorMessage, "mongoErrorLog.log");
  }
};

main();

module.exports = app;
