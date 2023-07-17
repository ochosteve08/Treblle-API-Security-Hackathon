const payloadSchema = require("./schema");
const { STATUS } = require("../consts");

/**
 * Returns a error payload based on the err object passed
 * @param {*} err Error object
 */
const getErrorPayload = (err) => {
  console.error(err);
  const error = {
    name: err.key || err.name,
    message: err.message || err,
    fields: err.fields,
    details: err.details,
    recovery: err.recovery,
    message_presets: err.message_presets,
    difference: err.difference,
    custom_key: err.custom_key,
    keyPattern: err.keyPattern,
    keyValue: err.keyValue,
  };

  if (error.name === "MongoError" || err.name === "MongoServerError") {
    error.name = err.code;
  }

  const { name } = error;
  let payload = {};
  switch (name) {
    case "MulterError":
      error.code = STATUS.BAD_REQUEST;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "TokenExpiredError":
    case "JsonWebTokenError":
      error.code = STATUS.FORBIDDEN;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "SyntaxError":
      error.message = "Bad Request";
      error.code = STATUS.BAD_REQUEST;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "SequelizeValidationError":
    case "MissingRequiredParameter":
    case "CustomValidationError":
      error.name = "ValidationError";
      error.code = STATUS.BAD_REQUEST;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "ValidationError":
      error.name = "ValidationError";
      error.code = STATUS.BAD_REQUEST;
      payload = payloadSchema.joiValidationErrorSchema(error);
      break;
    case "SequelizeUniqueConstraintError":
    case "Conflict":
      error.name = "Conflict";
      error.code = STATUS.CONFLICT;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case 11000:
      // MONGODB ERROR FOR DUPLICATE DATA
      error.name = "Duplicate";
      error.code = STATUS.CONFLICT;
      payload = payloadSchema.mongoErrorSchema(error);
      break;
    case "SequelizeForeignKeyConstraintError":
    case "ForeignKeyConstraintError":
      error.name = "Conflict";
      error.code = STATUS.CONFLICT;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "ResourceNotFoundException":
    case "NotFound":
      error.name = "NotFound";
      error.code = STATUS.NOT_FOUND;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "PreconditionFailed":
      error.code = STATUS.PRECONDITION_FAILED;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "Forbidden":
      error.code = STATUS.FORBIDDEN;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "Expired":
      error.code = STATUS.GONE;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "Reauthentication":
      error.code = STATUS.UNAUTHORIZED;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "TooManyRequests":
      error.code = STATUS.TOO_MANY_REQUEST;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "MethodNotAllowed":
      error.code = STATUS.METHOD_NOT_ALLOWED;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    case "TimeOut":
    case "ServiceUnavailableError":
      error.code = STATUS.TIME_OUT;
      payload = payloadSchema.commonErrorSchema(error);
      break;
    default:
      error.name = "Error";
      error.code = STATUS.INTERNAL_SERVER_ERROR;
      error.message = "Internal Server Error";
      payload = payloadSchema.commonErrorSchema(error);
  }
  return payload;
};

/**
 * Handler success and send appropriate response
 * @param data
 * @param req
 * @param res
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
const getSuccessPayload = (data) => payloadSchema.successSchema(data);

module.exports = {
  getErrorPayload,
  getSuccessPayload,
};
