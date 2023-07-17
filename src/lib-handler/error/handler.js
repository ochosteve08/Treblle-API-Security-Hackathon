const { getErrorPayload } = require("../payload");

/**
 * handle exceptions and send appropriate response
 * @param err
 * @param req
 * @param res
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const payload = getErrorPayload(err);
  console.error(JSON.stringify(payload, null, 2));
  return res.status(payload.error.code).send(payload);
};
