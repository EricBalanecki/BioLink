const express = require("express");
const router = express.Router();
const { downloadPDF }  = require("../controllers/downloadController");

router.get("/pdf", downloadPDF)

module.exports = router;