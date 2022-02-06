const Responses = require("../common/Responses");
const Auth = require("../common/Auth");

module.exports.handler = async (event) => {
  try {
    await Auth.signup(JSON.parse(event.body));
    return Responses._200({ message: "User registration successful" });
  } catch (error) {
    return Responses._400({ message: error.message || "Internal server error" });
  }
};
