var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "mysql",
  user: "root",
  password: "mazino123",
  database: "myapp",
});
exports.pool = pool;
