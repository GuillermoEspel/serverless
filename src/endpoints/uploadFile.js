const Responses = require("../common/Responses");
const S3 = require("../common/S3");

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const url = await S3.uploadFileFromBase64(body);
    return Responses._200({ message: "Success", url });
  } catch (error) {
    return Responses._400({ message: error.message || "Internal server error" });
  }
};
