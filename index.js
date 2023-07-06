// Import external packages
const express = require("express");
const treblle = require("@treblle/express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");


// Import internal modules
const { connectToMongoDb, environmentVariables } = require("./src/config");
const apiRoutes = require("./src/routes");

// Express app
const app = express();

// Middleware
app.use(express.json());

// Configure Treblle middleware for request monitoring and protection
app.use(
  treblle({
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID,
    additionalFieldsToMask: [],
  })
);

app.use(cors());

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
  max: 60, // 60 requests per hour
});

// Apply rate limiting middleware 
app.use( limiter);

app.get("/", (req, res) => {
  res.send({ message: "todo API working fine now" });
});

// Use routes
app.use("/api/v1", apiRoutes);

// Middleware to prevent MIME sniffing
const preventMimeSniffing = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
};

// Apply the middleware globally to all routes
app.use(preventMimeSniffing);

// Middleware to specify the content type as JSON for all responses
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    // Request is already secure, continue
    next();
  } else {
    // Redirect to HTTPS
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

const main = async () => {
  console.info("Starting server");
  await connectToMongoDb();
  console.info("Connected to MongoDB");
  app.listen(environmentVariables.APP_PORT || 8000, (err) => {
    if (err) {
      console.error(err);
    }
    console.info(
      `Server running on ${environmentVariables.APP_HOST}:${environmentVariables.APP_PORT}`
    );
  });
};

main();
