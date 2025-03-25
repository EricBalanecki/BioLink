const { pool } = require("../connect");
const path = require("path");
const fs = require("fs");

// Fetch all PDFs
exports.getAllPDFs = async (req, res) => {
    try {
        const [results] = await pool.query("SELECT * FROM brochures");
        res.json(results);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error" });
    }
};
// Upload and save PDF
exports.uploadPDF = async (req, res) => {
    console.log("Received POST /api/pdfs request");
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    if (!req.files || !req.body.name || !req.body.category || !req.body.subcategory) {
        console.log("Bad Request: Missing fields or file", req.body, req.files);
        return res.status(400).json({ message: "Missing fields or file" });
    }

    const { name, category, subcategory } = req.body;
    const pdfFile = req.files.pdfFile;
    const uploadDir = path.join(__dirname, "../../public/pdfs", category, subcategory);

    // Check if file already exists in database
    try {
        const [existingFiles] = await pool.query(
            "SELECT * FROM brochures WHERE name = ? AND category = ? AND subcategory = ?",
            [name, category, subcategory]
        );

        if (existingFiles.length > 0) {
            console.log("Conflict: PDF with the same name already exists in this category/subcategory.");
            return res.status(409).json({ message: "PDF already exists." });
        }
    } catch (error) {
        console.error("Database query failed:", error);
        return res.status(500).json({ message: "Database query failed" });
    }

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
        console.log("Creating directory:", uploadDir);
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate a new file name
    const fileExtension = path.extname(pdfFile.name); // Keep the original extension
    const newFileName = `${name}${fileExtension}`;

    // Define file paths
    const filePath = `/brochureDetails/${category}/${subcategory}/${name}`;
    const fullPath = path.join(uploadDir, newFileName);

    try {
        console.log("Saving file as:", newFileName);

        // Move and rename the uploaded file
        await pdfFile.mv(fullPath);

        // Insert into MySQL
        await pool.query(
            "INSERT INTO brochures (name, category, subcategory, file_path) VALUES (?, ?, ?, ?)",
            [name, category, subcategory, filePath]
        );

        console.log("PDF successfully uploaded:", filePath);
        res.json({ message: "PDF uploaded successfully", filePath });
    } catch (error) {
        console.error("File upload or database insert failed:", error);
        res.status(500).json({ message: "File upload or database insert failed" });
    }
};




// Delete PDF
exports.deletePDF = async (req, res) => {
    try {
        const { name, category, subcategory } = req.body; // <-- Now correctly using body

        if (!name || !category || !subcategory) {
            return res.status(400).json({ message: "Missing required parameters" });
        }


        // Check if the PDF exists in the database
        const [results] = await pool.query(
            "SELECT file_path FROM brochures WHERE name = ? AND category = ? AND subcategory = ?",
            [name, category, subcategory]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: "PDF not found" });
        }

        const filePath = path.join(__dirname, "../../public/pdfs", category, subcategory, name);
        const filePathExtension = `${filePath}.pdf`

        // Delete the file if it exists
        if (fs.existsSync(filePathExtension)) {
            fs.unlinkSync(filePathExtension);
        }

        // Delete the database record
        await pool.query(
            "DELETE FROM brochures WHERE name = ? AND category = ? AND subcategory = ?",
            [name, category, subcategory]
        );

        res.json({ message: "PDF deleted successfully" });
    } catch (error) {
        console.error("Database delete failed:", error);
        res.status(500).json({ message: "Database delete failed" });
    }
};

