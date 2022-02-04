const Dynamo = require("../common/Dynamo");

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const data = await Dynamo.deleteItem("TaskTable", id);

  // Define result
  const result = {};
  result.statusCode = 200;
  result.body = JSON.stringify(data);
  return result;
};
