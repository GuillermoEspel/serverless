const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();

const verifyParametersRequired = (params) => {
  const { email, password } = params;
  if (!email || !password) {
    throw new Error("Parameters required");
  }
};

const login = async (parameters) => {
  await verifyParametersRequired(parameters);
  const { email, password } = parameters;
  const params = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };
  const response = await cognito.adminInitiateAuth(params).promise();
  return response.AuthenticationResult.IdToken;
};

const signup = async (parameters) => {
  await verifyParametersRequired(parameters);
  const { email, password } = parameters;
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: email,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "email_verified", Value: "true" },
    ],
    MessageAction: "SUPPRESS",
  };
  const response = await cognito.adminCreateUser(params).promise();
  if (!response || !response.User) throw new Error("Error creating user");

  const paramsForSetPass = {
    Password: password,
    UserPoolId: process.env.USER_POOL_ID,
    Username: email,
    Permanent: true,
  };
  await cognito.adminSetUserPassword(paramsForSetPass).promise();
};

module.exports = {
  login,
  signup,
};
