const Responses = require("../common/Responses");
const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);
    const { USER_POOL_ID, CLIENT_ID } = process.env;
    const params = {
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };
    const response = await cognito.adminInitiateAuth(params).promise();
    console.log(response);
    return Responses._200({
      message: "Success",
      AuthenticationResult: response.AuthenticationResult,
    });
  } catch (error) {
    return Responses._400({ message: error.message || "Internal server error" });
  }
};
