const Responses = require("../common/Responses");

test("Responses is an object", () => {
  expect(typeof Responses).toBe("object");
});

const data = { value: "value" };
test("_200 success", () => {
  const res = Responses._200(data);
  expect(typeof Responses).toBe("object");
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe("string");
  expect(res.body).toBe(JSON.stringify(data));
  expect(res.headers["Content-Type"]).toBe("application/json");
});
test("_204 success", () => {
  const res = Responses._204(data);
  expect(typeof Responses).toBe("object");
  expect(res.statusCode).toBe(204);
  expect(typeof res.body).toBe("string");
  expect(res.body).toBe(JSON.stringify(data));
  expect(res.headers["Content-Type"]).toBe("application/json");
});
test("_400 success", () => {
  const res = Responses._400(data);
  expect(typeof Responses).toBe("object");
  expect(res.statusCode).toBe(400);
  expect(typeof res.body).toBe("string");
  expect(res.body).toBe(JSON.stringify(data));
  expect(res.headers["Content-Type"]).toBe("application/json");
});
test("_404 success", () => {
  const res = Responses._404(data);
  expect(typeof Responses).toBe("object");
  expect(res.statusCode).toBe(404);
  expect(typeof res.body).toBe("string");
  expect(res.body).toBe(JSON.stringify(data));
  expect(res.headers["Content-Type"]).toBe("application/json");
});
test("_DefineResponse success", () => {
  const res = Responses._DefineResponse(567, data);
  expect(typeof Responses).toBe("object");
  expect(res.statusCode).toBe(567);
  expect(typeof res.body).toBe("string");
  expect(res.body).toBe(JSON.stringify(data));
  expect(res.headers["Content-Type"]).toBe("application/json");
});
