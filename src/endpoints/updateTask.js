const Responses = require("../common/Responses");
const Dynamo = require("../common/Dynamo");

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const body = JSON.parse(event.body);
  const data = await Dynamo.updateItem(process.env.TASK_TABLE, id, body);
  return Responses._200(data);
};
