const Responses = require("../common/Responses");
const Dynamo = require("../common/Dynamo");

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const data = await Dynamo.deleteItem(process.env.TASK_TABLE, id);
  return Responses._200(data);
};
