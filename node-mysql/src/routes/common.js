const express = require("express");
const router = express.Router();
 
const { getCountries, getPdfs, getBrochure, getSubcats, updateLog} = require("../controllers/commonController");
const { sendEmail, linkOpened } = require("../controllers/emailController");
const { search } = require("../controllers/searchController");

router.get("/countries", getCountries);
router.get("/pdfs", getPdfs);
router.get("/brochure", getBrochure);
router.get("/search", search);
router.post("/email", sendEmail);
router.post("/link", linkOpened)
router.get("/subcategories", getSubcats);
router.post("/log", updateLog);

module.exports = router;

