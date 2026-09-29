const request = require("supertest");
const fs = require("fs");
const app = require("../app");


test("GET / returns a successful response", async () => {
  const response = await request(app).get("/");

  expect(response.statusCode).toBe(200);
  expect(response.text.length).toBeGreaterThan(0);
});


test("GET /log is not empty after creating a log entry", async () => {
  
  await request(app).get("/");

  const response = await request(app).get("/log");

  expect(response.statusCode).toBe(200);
  expect(response.text.length).toBeGreaterThan(0);
});

test("GET /log returns string", async () => {
    await request(app).get("/");
    const response = await request(app).get("/log");

    expect(response.statusCode).toBe(200);
    expect(typeof response.text).toBe("string");    
})

test("GET /clear returns cleared", async () => {
  const response = await request(app).get("/clear");

  expect(response.statusCode).toBe(200);
  expect(response.text).toBe("cleared");
});

test("GET /clear log is empty after clearing", async () => {

    fs.writeFileSync("log.txt", "test data");
    const response = await request(app).get("/clear");

    expect(response.statusCode).toBe(200);
    const content = fs.readFileSync("log.txt", "utf8");
    expect(content).toBe("");

})