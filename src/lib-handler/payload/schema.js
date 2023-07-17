const { STATUS } = require("../consts");

/**
 * Return success payload
 * @param data
 * @returns {{data: *, meta: {version: number, timestamp: Date}}}
 */
const successSchema = (data) => ({
  data,
  meta: {
    version: 1.0,
    timestamp: new Date(),
  },
});

/**
 * Return Error Payload
 * @param error
 * @param code
 * @param recovery: {
 *  message,
    message_presets,
    options,
 * }
 * @returns {{meta: {version: number, timestamp: Date}, error: {code: *, message: *}}}
 */
const commonErrorSchema = ({
  code,
  name,
  message,
  fields,
  recovery,
  message_presets,
  difference,
  custom_key,
}) => {
  const key = custom_key || name;

  const response = {
    error: {
      code,
      key,
      message,
      fields,
      message_presets,
      recovery,
      difference,
    },
    meta: {
      version: 1.0,
      timestamp: new Date(),
    },
  };
  return response;
};

const mongoErrorSchema = ({
  code,
  name,
  message,
  fields,
  recovery,
  message_presets,
  difference,
  custom_key,
  keyPattern,
  keyValue,
}) => {
  const key = custom_key || name;
  message = "Duplicate entry";
  fields = [];
  fields.push({
    key: Object.keys(keyPattern).toString(),
    message:
      "Resource all ready exist with value " +
      Object.values(keyValue).toString(),
  });
  const response = {
    error: {
      code,
      key,
      message,
      fields,
      message_presets,
      recovery,
      difference,
    },
    meta: {
      version: 1.0,
      timestamp: new Date(),
    },
  };
  return response;
};

/**
 * Return Joi error payload
 * @param error
 * @param code
 * @param recovery {
 *  message,
    message_presets,
    options,
 * }
 * @returns {{meta: {version: number, timestamp: Date}, error: {code: number, message: string, fields: Array}}}
 */
const joiValidationErrorSchema = ({
  code = STATUS.BAD_REQUEST,
  name,
  details,
  recovery,
  message_presets,
  custom_key,
}) => {
  const key = custom_key || name || "Error";
  const response = {
    error: {
      code,
      key,
      message: "ValidationError",
      fields: [],
      message_presets,
      recovery,
    },
    meta: {
      version: 1.0,
      timestamp: new Date(),
    },
  };

  details.map((e) => {
    response.error.fields.push({
      key: e.context.key,
      type: e.type,
      message: e.message.split(":")[0],
    });

    return e;
  });

  return response;
};

module.exports = {
  commonErrorSchema,
  joiValidationErrorSchema,
  successSchema,
  mongoErrorSchema,
};
