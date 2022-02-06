const Responses = require("../common/Responses");

module.exports.handler = async (event) => {
  return Responses._200({ message: "OK" });
};
