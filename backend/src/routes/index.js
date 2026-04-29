const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", function (req, res) {
    // res.json({ message: 'API working nice' });
    res.sendFile(path.join(__dirname, "../../../frontend/html/login.html"));
})

module.exports = router