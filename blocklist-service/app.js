const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3001;


const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "blocklist",
  port: 5432,
});

app.use(express.text());


app.get("/blocklist", (req, res) => {

  const query = `SELECT ip_address FROM blocklist GROUP BY ip_address HAVING count (*) >= 2`;

  pool.query(query)
    .then((result) => {
        console.log(result.rows);

        res.send(result.rows);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error");
    });

});

app.get("/isBlocked", (req, res) => {
  const ip = req.query.ip;
  
  const query = `SELECT COUNT(*) FROM blocklist WHERE ip_address = '${ip}'`;
  console.log("IP:", ip);
  console.log(query);

  pool.query(query)
    .then((result) => {
        const count = parseInt(result.rows[0].count);
        if (count >= 2){
            res.send("true");
        }else{
            res.send("false");
        }
    })
    .catch((err) =>{
        console.error(err);
        res.status(500).send("Error");
    });

    
    
});

app.post("/blocklist", (req, res) => {

  console.log(req.body); 
  const [ip, path] = req.body.split(",");
  const timestamp = new Date();

  console.log("IP:", ip);
  console.log("PATH:", path);
  console.log("TIMESTAMP:", timestamp);

  const query = `
    INSERT INTO blocklist (ip_address, path, timestamp)
    VALUES ('${ip}', '${path}', '${timestamp.toISOString()}')
  `;

  pool.query(query)
    .then(() => {
      console.log("Data inserted successfully!");
      res.send("false");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error");
    });
});

pool.query("SELECT NOW()")
  .then((result) => {
    console.log("Database connected!");
    console.log(result.rows[0]);
  })
  .catch((err) => {
    console.error("Database connection failed:");
    console.error(err);
  });

pool.query(`
  CREATE TABLE IF NOT EXISTS blocklist (
    id SERIAL PRIMARY KEY,
    ip_address TEXT NOT NULL,
    path TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL
  )
`)
  .then(() => {
    console.log("Blocklist table ready!");
  })
  .catch((err) => {
    console.error("Table creation failed:");
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`Blocklist Service running on port ${PORT}`);
});