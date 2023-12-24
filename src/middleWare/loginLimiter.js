const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const loginLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 5, // limit each IP to 5 login requests per 'window' (20 minutes)
  message: {
    message:
      "Too many login attempts from this IP, please try again after 20 minutes",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
});

module.exports = {loginLimiter};
