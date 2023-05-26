const express = require("express");
const router = express.Router();
const controller = require("./Controller");

router.get("/", (req, res) => {
  controller.get(req, (response) => {
    res.json(response);
  });
});

module.exports = router;
