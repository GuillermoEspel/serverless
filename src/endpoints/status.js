module.exports.handler = async (event) => {
  const bodyResult = { message: "OK" };
  return {
    statusCode: 200,
    body: JSON.stringify(bodyResult, null, 2),
  };
};
