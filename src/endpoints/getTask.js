const Dynamo = require("../common/Dynamo");

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const data = await Dynamo.getItem("TaskTable", id);

  // Define result
  const result = {};
  result.statusCode = 200;
  result.body = JSON.stringify(data);
  return result;
};
