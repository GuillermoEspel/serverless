const Responses = require("../common/Responses");

module.exports.handler = async (event) => {
  const email = event.requestContext.authorizer.claims.email;
  return Responses._200({ message: `Email ${email} has been authorized` });
};
