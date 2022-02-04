const Dynamo = require("../common/Dynamo");

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const body = JSON.parse(event.body);
  const data = await Dynamo.updateItem("TaskTable", id, body);

  // Define result
  const result = {};
  result.statusCode = 200;
  result.body = JSON.stringify(data);
  return result;
};
