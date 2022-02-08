const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.REGION });
const rekognition = new AWS.Rekognition();

const getTextFromImageBase64 = async (params) => {
  if (!params || !params.base64) throw new Error("Parameters required");
  if (typeof params.base64 !== "string") throw new Error("Parameter base64 invalid");

  const { base64 } = params;
  const match = base64.match(/data:(.*);base64,(.*)/);
  const isMatch = match && match[2];
  const base64Data = isMatch ? match[2] : base64;
  const buffer = new Buffer.from(base64Data, "base64");
  const { TextDetections } = await rekognition
    .detectText({
      Image: {
        Bytes: buffer,
      },
    })
    .promise();
  let response = [];
  TextDetections.map((o) => o.Type == "LINE" && response.push(o.DetectedText));
  return response;
};

module.exports = {
  getTextFromImageBase64,
};
