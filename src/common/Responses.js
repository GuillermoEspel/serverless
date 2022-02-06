const _DefineResponse = (statusCode = 502, data = {}) => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
  };
};
const _200 = (data = {}) => {
  return _DefineResponse(200, data);
};
const _204 = (data = {}) => {
  return _DefineResponse(204, data);
};
const _400 = (data = {}) => {
  return _DefineResponse(400, data);
};
const _404 = (data = {}) => {
  return _DefineResponse(404, data);
};

module.exports = {
  _DefineResponse,
  _200,
  _204,
  _400,
  _404,
};
