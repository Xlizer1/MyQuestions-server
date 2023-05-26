const executeQuery = require("../../helper/common").executeQuery;

async function get(req, callback) {
  let sql = `SELECT * FROM units`;
  executeQuery(sql, "get Questions from db", (result) => {
    callback(result);
  });
}

module.exports = {
  get,
};
