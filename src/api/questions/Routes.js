const express = require("express");
const router = express.Router();
const controller = require("./Controller");

router.get("/", (req, res) => {
  controller.get(req, (response) => {
    res.json(response);
  });
});

router.get("/:id", (req, res) => {
  controller.getQuestionById(req, (response) => {
    res.json(response);
  });
});

router.post("/add", (req, res) => {
  controller.addQuestion(req, (response) => {
    res.json(response);
  });
});

router.put("/:id", (req, res) => {
  controller.updateQuestion(req, (response) => {
    res.json(response);
  });
});

router.delete("/:id", (req, res) => {
  controller.deleteQuestion(req, (response) => {
    res.json(response);
  });
});

module.exports = router;
