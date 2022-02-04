const Dynamo = require("../common/Dynamo");

test("Dynamo is an object", () => {
  expect(typeof Dynamo).toBe("object");
});
test("Dynamo has functions", () => {
  expect(typeof Dynamo.getAll).toBe("function");
  expect(typeof Dynamo.getItem).toBe("function");
});

const validTableName = "TaskTable";
const data = {
  title: "Title Test",
  description: "Description Test",
};

test("Dynamo getAll", async () => {
  const res = await Dynamo.getAll(validTableName);
  expect(Array.isArray(res)).toBe(true);
  expect(res.length).toBe(0);
});
test("Dynamo createItem", async () => {
  const res = await Dynamo.createItem(validTableName, data);
  expect(typeof res).toBe("object");
  expect(typeof res.id).toBe("string");
  expect(typeof res.title).toBe("string");
  expect(res.title).toEqual(data.title);
  expect(typeof res.description).toBe("string");
  expect(res.description).toEqual(data.description);
  expect(typeof res.done).toBe("boolean");
  expect(res.done).toEqual(false);
});
test("Dynamo getItem - Item not found", async () => {
  const id = "a78c0e21-2040-4f04-8700-e79c76c652ac";
  try {
    await Dynamo.getItem(validTableName, id);
  } catch (error) {
    expect(error.message).toMatch(/Error fetching the data for ID of/);
  }
});
test("Dynamo getItem", async () => {
  const newItem = await Dynamo.createItem(validTableName, data);
  const item = await Dynamo.getItem(validTableName, newItem.id);
  expect(typeof item).toBe("object");
  expect(item.id).toBe(newItem.id);
  expect(item.title).toBe(newItem.title);
  expect(item.description).toBe(newItem.description);
  expect(item.done).toBe(newItem.done);
});
