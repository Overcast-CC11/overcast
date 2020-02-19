const express = require("express");
// const app = express();
// const path = require("path");

const router = express.Router();
router.get("/hello", (req, res) => {
  console.log("hi there");
  res.status(200).json("hi Sachi");
  // res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

module.exports = router;
