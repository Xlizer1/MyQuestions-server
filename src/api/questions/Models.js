const executeQuery = require("../../helper/common").executeQuery;

async function get(req, callback) {
  let sql = `SELECT * FROM questions`;
  executeQuery(sql, "get Questions from db", (result) => {
    callback(result);
  });
}

async function getQuestionById(req, callback) {
  let id = req.params.id;

  let sql = `SELECT * FROM questions WHERE id = ${id}`;

  executeQuery(sql, "get Question by ID from db", (result) => {
    callback(result);
  });
}

async function addQuestion(req, callback) {
  let { question, video_link, year, unit_id, subject_id, turn_id, answer } =
    req.body;

  let sql = `INSERT INTO questions (question, answer, video_link, year, unit_id, subject_id, turn_id, created_at)
    VALUES("${question}", "${answer}", "${video_link}", ${year}, ${unit_id}, ${subject_id}, ${turn_id}, now())`;

  executeQuery(sql, "get Questions from db", (result) => {
    callback(result);
  });
}

async function updateQuestion(req, callback) {
  let id = req.params.id;
  let { question, video_link, year, unit_id, subject_id, turn_id, answer } =
    req.body;

  let sql = `UPDATE questions SET
        question = "${question}",
        answer = "${answer}",
        video_link = "${video_link}",
        year = ${year},
        unit_id = ${unit_id},
        subject_id = ${subject_id},
        turn_id = ${turn_id},
        updated_at = now()
        WHERE id = ${id}`;

  executeQuery(sql, "update Question in db", (result) => {
    callback(result);
  });
}

async function deleteQuestion(req, callback) {
  let id = req.params.id;

  let sql = `DELETE FROM questions WHERE id = ${id}`;

  executeQuery(sql, "delete Question from db", (result) => {
    callback(result);
  });
}

module.exports = {
  get,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion,
};
