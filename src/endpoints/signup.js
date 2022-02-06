const Responses = require("../common/Responses");
const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);
    const user_pool_id = process.env.USER_POOL_ID;

    const params = {
      UserPoolId: user_pool_id,
      Username: email,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "email_verified", Value: "true" },
      ],
      MessageAction: "SUPPRESS",
    };
    const response = await cognito.adminCreateUser(params).promise();
    if (!response || !response.User)
      return Responses._400({ message: "El usuario no se pudo crear" });

    const newUser = response.User;
    const paramsForSetPass = {
      Password: password,
      UserPoolId: user_pool_id,
      Username: email,
      Permanent: true,
    };
    await cognito.adminSetUserPassword(paramsForSetPass).promise();

    return Responses._200({ message: "User registration successful" });
  } catch (error) {
    //error.code = "UsernameExistsException"
    return Responses._400({ message: error.message || "Internal server error" });
  }
};
