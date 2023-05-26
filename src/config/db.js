const mysql = require("mysql");

var host = process.env.HOST,
  user = process.env.DB_USER,
  password = process.env.PASSWORD,
  database = process.env.DATABASE;

var con;

/* db connection */
async function connectDb() {
  console.log("Trying to connect to DB");
  con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    multipleStatements: true,
    charset: "utf8",
  });

  await con.connect((err) => {
    if (err) {
      console.log("Error in DB connection:", err);
      connectDb();
    } else {
      console.log("-----------", "DB Connected to: ", database, "-----------");
    }
  });

  setInterval(function () {
    con.query("SELECT 1");
  }, 600000);
}

connectDb();

module.exports = con;
