const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8199;

app.get("/", async (req, res) => {

    
  try {
    const ip = req.headers["x-forwarded-for"] || req.ip;

    console.log("IP:", ip);

    const response = await axios.get(
    `http://blocklist-service:3001/isBlocked?ip=${ip}`
);
    console.log(response.data);

    console.log(typeof response.data);
    if (response.data === true){
        res.type("text/plain");
        return res.status(404).send("Blocked");
    }else{
        const LogResponse = await axios.get(
            "http://log-service:3000"
        );
        res.type("text/plain");
        res.send(LogResponse.data);
    }
    
  } catch (error) {
    res.type("text/plain");
    res.status(502).send("Error");
  }
});

app.get("/log", async (req,res) => {

    try{
        const LogResponse = await axios.get(
            "http://log-service:3000/log"
        );
        res.type("text/plain");
        res.send(LogResponse.data)

    } catch (error){
        res.type("text/plain");
        res.status(502).send("Error");
    }

});

app.get("/blocklist", async (req, res) => {
  try {
    const response = await axios.get(
      "http://blocklist-service:3001/blocklist"
    );
    res.type("text/plain");
    res.send(response.data);

  } catch (error) {
    res.type("text/plain");
    res.status(502).send("Error");
  }
});

app.get("/clear", async (req, res) => {
  try {
    await axios.get("http://log-service:3000/clear");
    await axios.get("http://blocklist-service:3001/clear");

    res.type("text/plain");
    res.status(200).send("complete");
  } catch (error) {
    res.type("text/plain");
    res.status(502).send("Error")
  }
});

app.use(async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.ip;

    const response = await axios.post(
      "http://blocklist-service:3001/blocklist",
      `${ip},${req.path}`,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );

    if (response.data === true) {
      res.type("text/plain");
      return res.status(404).send("Blocked");
    }
    res.type("text/plain");
    res.status(401).send("Unauthorized");

  } catch (error) {
    res.type("text/plain");
    res.status(502).send("Error");
  }
});

app.listen(PORT, () => {
  console.log(`API Service running on port ${PORT}`);
});