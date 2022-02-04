const Dynamo = require("../common/Dynamo");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const data = await Dynamo.createItem("TaskTable", body);

  // Define result
  const result = {};
  result.statusCode = 200;
  result.body = JSON.stringify(data);
  return result;
};
