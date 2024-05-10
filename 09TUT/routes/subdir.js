const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  // ".." goes 1 level up into the root directory aka folder then goes into the views folder then the subdir folder and lastly the index.html file
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});
router.get("^/test(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

module.exports = router;
