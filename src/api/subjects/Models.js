const executeQuery = require("../../helper/common").executeQuery;

async function get(req, callback) {
  let sql = `SELECT * FROM subjects`;
  executeQuery(sql, "get Subjects from db", (result) => {
    callback(result);
  });
}

module.exports = {
  get,
};
