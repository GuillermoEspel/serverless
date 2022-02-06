const Responses = require("../common/Responses");
const Auth = require("../common/Auth");

module.exports.handler = async (event) => {
  try {
    const idToken = await Auth.login(JSON.parse(event.body));
    return Responses._200({ message: "Success", idToken });
  } catch (error) {
    return Responses._400({ message: error.message || "Internal server error" });
  }
};
