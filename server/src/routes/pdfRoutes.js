const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");


// Handles the routes for pdf imports and deletions
router.get("/", pdfController.getAllPDFs);
router.post("/", pdfController.uploadPDF);
router.delete("/", pdfController.deletePDF);

module.exports = router;
