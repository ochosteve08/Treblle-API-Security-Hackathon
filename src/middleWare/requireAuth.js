const { UserModel } = require("../models");
const { jwt } = require("../utils");
const { error } = require("../lib-handler");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (
    !authorization ||
    (authorization && !authorization.startsWith("Bearer"))
  ) {
    return error.handler(
      { error: "Authorization token required" },
      req,
      res,
      next
    );
  }
  const token = authorization.split(" ")[1];

  try {
    const decoded = await jwt.verifyToken(token);
    const { _id } = decoded;

    req.user = await UserModel.findOne({ _id }).select("_id");

    next();
  } catch (err) {
    return error.handler({ err: "Request is not authorized" }, req, res, next);
  }
};

module.exports = requireAuth;
