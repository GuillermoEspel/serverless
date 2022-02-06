const Responses = require("../common/Responses");

module.exports.handler = async (event) => {
  if (!event.requestContext.authorizer.claims)
    return Responses._400({ message: "Usuario no autorizado" });
  const authorizer = event.requestContext.authorizer;
  console.log(authorizer);
  //event.requestContext.authorizer.claims.email
  return Responses._200({ message: `Email has been authorized` });
};
