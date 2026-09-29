const request = require("supertest");
const app = require("../app");

test("GET /clear returns cleared", async () => {
  const response = await request(app).get("/clear");

  expect(response.statusCode).toBe(200);
  expect(response.text).toBe("cleared");
});