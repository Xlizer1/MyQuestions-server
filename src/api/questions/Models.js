const executeQuery = require("../../helper/common").executeQuery;

async function get(req, callback) {
  let sql = `SELECT SQL_CALC_FOUND_ROWS * FROM questions WHERE deleted_at is null`;
  let { page, page_size, search_text, year, unit_id, turn_id, subject_id } =
    req.query;

  if (search_text) sql += ` AND question like "%${search_text}%"`;
  if (year) sql += ` AND year = "${year}"`;
  if (unit_id) sql += ` AND unit_id = ${unit_id}`;
  if (turn_id) sql += ` AND turn_id = ${turn_id}`;
  if (subject_id) sql += ` AND subject_id = ${subject_id}`;

  sql += ` ORDER BY created_at DESC`;

  const offset = (page - 1) * page_size;
  const limit = page_size;
  sql += ` LIMIT ${offset}, ${limit}`;

  sql += `; SELECT FOUND_ROWS() AS total_rows`;

  executeQuery(sql, "get Questions from db", (data) => {
    const totalRows = data[1][0].total_rows;
    const response = {
      data: data[0],
      totalRows: totalRows,
      current_page: page,
    };
    callback(response);
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
  let { question, video_link, yearsAndTurns, unit_id, subject_id, answer } =
    req.body;

  let sql = `INSERT INTO questions (question, answer, video_link, yearsAndTurns, unit_id, subject_id, created_at)
    VALUES("${question}", "${answer}", "${video_link}", '${yearsAndTurns}', ${unit_id}, ${subject_id}, now())`;

  executeQuery(sql, "add Question to the db", (result) => {
    callback(result);
  });
}

async function updateQuestion(req, callback) {
  let id = req.params.id;
  let { question, answer, video_link, yearsAndTurns, unit_id, subject_id } =
    req.query;

  let sql = `UPDATE questions SET
        question = "${question}",
        answer = "${answer}",
        video_link = "${video_link}",
        yearsAndTurns = '${yearsAndTurns}',
        unit_id = ${unit_id},
        subject_id = ${subject_id},
        updated_at = now()
        WHERE id = ${id}`;

  console.log(sql);

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
