const AWS = require("aws-sdk");
const { v4 } = require("uuid");

let options = {};
if (process.env.IS_OFFLINE) {
  options.region = "localhost";
  options.endpoint = "http://localhost:8000";
}
if (process.env.JEST_WORKER_ID) {
  options.region = "local-env";
  options.endpoint = "http://localhost:8000";
  options.sslEnabled = false;
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);
const getAll = async (TableName) => {
  const params = { TableName };
  const data = await documentClient.scan(params).promise();
  if (!data || !data.Items) {
    throw Error(`Error fetching the data from ${TableName}`);
  }
  return data.Items;
};
const getItem = async (TableName, id) => {
  const params = { TableName, Key: { id } };
  const data = await documentClient.get(params).promise();
  if (!data || !data.Item) {
    throw Error(`Error fetching the data for ID of ${id} from ${TableName}`);
  }
  return data.Item;
};
const createItem = async (TableName, parameters) => {
  const { title, description } = parameters;
  const newTask = {
    id: v4(),
    title: title,
    description: description,
    createdAt: new Date(),
    done: false,
  };
  const params = { TableName, Item: newTask };
  await documentClient.put(params).promise();
  return newTask;
};
const updateItem = async (TableName, id, parameters) => {
  const { done } = parameters;
  const params = {
    TableName,
    Key: { id },
    UpdateExpression: "set done = :done",
    ExpressionAttributeValues: { ":done": done },
    ReturnValues: "ALL_NEW",
  };
  const data = await documentClient.update(params).promise();
  console.log({ data });
  if (!data || !data.Attributes) {
    throw Error(`Error updating the data for ID of ${id} from ${TableName}`);
  }
  return data.Attributes;
};
const deleteItem = async (TableName, id) => {
  const params = { TableName, Key: { id } };
  const data = await documentClient.get(params).promise();
  if (!data || !data.Item) {
    throw Error(`Error deleting the data for ID of ${ID} from ${TableName}`);
  }
  return data.Item;
};
const Dynamo = { getItem, getAll, createItem, updateItem, deleteItem };

module.exports = Dynamo;
