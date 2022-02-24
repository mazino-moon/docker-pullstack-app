const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

app.use(bodyParser.json());

//테이블생성
db.pool.query(`CREATE TABLE lists (
  id INTEGER AUTO_INCREMENT,
  value TEXT, 
  PRIMARY KEY (id)
)`, (err, results, fileds) => {
  console.log('results', results)
})
//DB lists 테이블에 있는 모든 데이터를 프론트 서베에 보내주기 
app.get('/api/hi', function (req, res) {
  //데이테베이스에서 모든 정보 가져오기 
 res.status(200).send('good')
})

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
