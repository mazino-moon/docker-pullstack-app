const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

app.use(bodyParser.json());

//테이블생성
db.pool.query(`CREATE TABLE lists(
id INTEGER_AUTO_INCREMENT,
value TEXT,
PRIMARY KEY (id)
)`),
  (err, results, fileds) => {
    console.log("results", results);
  };

app.get("/api/values", function (req, res) {
  db.pool.query("SELECT * FROM lists;", (err, results, fileds) => {
    if (err) return res.status(500).send(err);
    else return res.json(results);
  });
});

app.post("/api/value", function (req, res, next) {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fileds) => {
      if (err) return res.status(500).send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(4000, () => {
  console.log("포트 4000 실행");
});
