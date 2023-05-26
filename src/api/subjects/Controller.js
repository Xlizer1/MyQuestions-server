const model = require("./Models");
var getRes = require("../../helper/common").getResponse;

async function get(req, res) {
  model.get(req, (result) => {
    if (result) res(getRes(true, result, ""));
  });
}

module.exports = {
  get,
};
