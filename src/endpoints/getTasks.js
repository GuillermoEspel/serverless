const Responses = require("../common/Responses");
const Dynamo = require("../common/Dynamo");

module.exports.handler = async (event) => {
  const data = await Dynamo.getAll(process.env.TASK_TABLE);
  return Responses._200(data);
};
