//import external packages
const express = require("express");
const treblle = require("@treblle/express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");


// Import internal modules

const { connectToMongoDb, environmentVariables } = require("./src/config");

// express app
const app = express();

// Middleware
app.use(express.json());
app.use(treblle());
app.use(cors());

app.use(
  treblle({
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID,
    additionalFieldsToMask: [],
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(helmet());

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 60 // 60 requests per hour
});

// Apply rate limiting middleware to all routes
app.use(limiter);

app.get("/api", (req, res) => {
  res.send({ message: "todo API working fine..." });
});

/*//route
app.use("/todo", todoRoutes);
app.use("*", () => {
  throw new Error({
    message: "Route not found",
    code: 404,
  });
});*/


app.listen(environmentVariables.APP_PORT || 8000, (err) => {
  if (err) {
    console.error(err);
  }

  connectToMongoDb()
    .then(() => {
      console.info("connected to mongodb");
      console.info(
        `Server running on ${environmentVariables.APP_HOST}:${environmentVariables.APP_PORT}`
      );
    })
    .catch((_error) => {
      console.log(_error);
    });
});
