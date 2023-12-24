const { getErrorPayload } = require("../payload");
const { logEvents} = require("../../middleWare/logger");

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
  const errDetails = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${
    req.headers.origin || "Origin not provided"
  }\t${req.ip}`;
  logEvents(errDetails, "errLog.log");
  console.error(errDetails);
  return res.status(payload.error.code).send(payload);
};
