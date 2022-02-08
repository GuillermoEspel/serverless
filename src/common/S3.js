const AWS = require("aws-sdk");
const s3 = new AWS.S3({ region: process.env.REGION });
const { v4 } = require("uuid");

const uploadFileFromBase64 = async (params) => {
  if (!params || typeof params !== "object") throw new Error("Parameter invalid");
  const { base64 } = params;
  if (!base64) throw new Error("Parameter required");
  if (typeof base64 !== "string") throw new Error("Parameter invalid");

  const match = base64.match(/data:(.*);base64,(.*)/);
  if (!match[1] || !match[2]) throw new Error("Parameter invalid");
  const ContentType = match[1];
  const data = match[2];
  const ext = ContentType.split("/")[1];
  const Key = `${v4()}.${ext}`;
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key,
    Body: new Buffer.from(data, "base64"),
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType,
  };
  const file = await s3.putObject(s3Params).promise();
  return `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${Key}`;
};

module.exports = {
  uploadFileFromBase64,
};
