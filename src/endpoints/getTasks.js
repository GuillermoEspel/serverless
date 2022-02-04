const Dynamo = require("../common/Dynamo");

module.exports.handler = async (event) => {
  const data = await Dynamo.getAll("TaskTable");

  // Define result
  const result = {};
  result.statusCode = 200;
  result.body = JSON.stringify(data);
  return result;
};
