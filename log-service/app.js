const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

let counter = 0;

app.get("/", (req, res) => {
  counter++;

  const timestamp = new Date().toISOString().split(".")[0] + "Z";
  const logLine = `${counter},${timestamp}`;

  fs.appendFileSync("log.txt", logLine + "\n");

  res.type("text/plain");
  res.send(logLine);
});

app.get("/log", (req, res) => {
  try {
    const content = fs.readFileSync("log.txt", "utf8");

    res.type("text/plain");
    res.send(content);
  } catch (error) {
    res.type("text/plain");
    res.send("");
  }
});

app.get("/clear",(req, res) => {

  counter = 0;
  fs.writeFileSync("log.txt", "");
  res.type("text/plain");
  res.send("cleared");

});

app.listen(PORT, () => {
  console.log(`Log Service running on port ${PORT}`);
});