const { getSuccessPayload } = require("../payload");
const { STATUS } = require("../consts");

/**
 * Handler success and send appropriate response
 * @param data
 * @param req
 * @param res
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (data, req, res, next) => {
  const payload = getSuccessPayload(data);
  return res.status(STATUS.OK).send(payload);
};
