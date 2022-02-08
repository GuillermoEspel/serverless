const Responses = require("../common/Responses");
const Rekognition = require("../common/Rekognition");

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const texts = await Rekognition.getTextFromImageBase64(body);
    return Responses._200({ texts });
  } catch (error) {
    return Responses._400({ message: error.message || "Internal server error" });
  }
};
