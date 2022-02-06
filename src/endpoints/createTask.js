const Responses = require("../common/Responses");
const Dynamo = require("../common/Dynamo");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const data = await Dynamo.createItem(process.env.TASK_TABLE, body);
  return Responses._200(data);
};
