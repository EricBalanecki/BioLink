const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");

router.get("/", pdfController.getAllPDFs);
router.post("/", pdfController.uploadPDF);
router.delete("/", pdfController.deletePDF);

module.exports = router;
