const model = require("./Models");
var getRes = require("../../helper/common").getResponse;

async function get(req, res) {
  model.get(req, (result) => {
    if (result) res(getRes(true, result, ""));
  });
}

async function getQuestionById(req, res) {
  model.getQuestionById(req, (result) => {
    if (result) res(getRes(true, result, ""));
  });
}

async function addQuestion(req, res) {
  model.addQuestion(req, (result) => {
    if (result) res(getRes(true, result, ""));
  });
}

async function updateQuestion(req, res) {
  model.updateQuestion(req, (result) => {
    if (result) res(getRes(true, result, ""));
  });
}

async function deleteQuestion(req, res) {
  model.deleteQuestion(req, (result) => {
    if (result) res(getRes(true, result, ""));
  });
}

module.exports = {
  get,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion,
};
