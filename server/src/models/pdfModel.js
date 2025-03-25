const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    url: { type: String, required: true }
});

module.exports = mongoose.model("PDF", pdfSchema);
