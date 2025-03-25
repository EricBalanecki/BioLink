const { pool } = require("../connect");
const { tryCatchWrapper } = require("../tryCatchWrapper");


const path = require('path');
const fs = require('fs').promises; // Use the promises API of fs
const baseFolder = path.resolve(__dirname, '../../../node-mysql/public/pdfs'); // Adjust the path as needed
const subdirectories = ['Miscellaneous', 'Neurology', 'Oncology'];

const getCountries = tryCatchWrapper(async function (req, res, next) {
    let sql = "SELECT ID as id, NAME, CONTINENT, ISO2 FROM COUNTRIES WHERE COUNTRIES.FLAG = 1"
    res.setHeader('Content-Type', 'application/json')
    const [rows] = await pool.query(sql);
    return res.status(200).json( {data: rows} );
});

const getSubcats = tryCatchWrapper(async (req, res, next) => {
    try {
        const category = req.query.category;
        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }

        // Query the database for subcategories within the given category
        const [rows] = await pool.query(
            "SELECT DISTINCT subcategory FROM brochures WHERE category = ?",
            [category]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "No subcategories found for the given category" });
        }

        // Format response
        const subcategories = rows.map(row => ({
            category: category,
            name: row.subcategory
        }));

        return res.status(200).json(subcategories);

    } catch (err) {
        next(err); // Pass any errors to the next middleware
    }
});


const getPdfs = tryCatchWrapper(async (req, res, next) => {
    try {
        const category = req.query.category;
        const subcategory = req.query.subcategory;

        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }

        // Query the database for PDFs in the specified category and subcategory
        const [rows] = await pool.query(
            "SELECT name FROM brochures WHERE category = ? AND subcategory = ?",
            [category, subcategory]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "No PDFs found for the given category and subcategory" });
        }

        // Format response
        const pdfFiles = rows.map(row => ({
            category: category,
            name: row.name,
        }));

        return res.status(200).json(pdfFiles);

    } catch (err) {
        next(err); // Pass any errors to the next middleware
    }
});

const getBrochure = tryCatchWrapper(async (req, res, next) => {
    try {
        const category = req.query.category;
        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }
        const brochure = req.query.brochure;
        if (!brochure) {
            return res.status(400).json({ error: 'Brochure is required' });
        }
   
        const subdirPath = path.join(baseFolder, category);
        console.log(`Reading directory: ${subdirPath}`);
       
        const files = await fs.readdir(subdirPath); // Read the directory contents
        const pdfFiles = files.map(file =>({
            name: path.basename(file, '.pdf'),
            image: file.replace(".pdf", ".jpg")
        }));
 
        return res.status(200).json(pdfFiles[brochure]);
        // res.status(200).send('Files logged to console');
    } catch (err) {
        next(err); // Pass any errors to the next middleware
    }
});

const updateLog = async (req, res) => {
    const { user, page } = req.body;

    if (!user || !page ) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {

        // Insert into MySQL
        await pool.query(
            "INSERT INTO access_log (user, page) VALUES (?, ?)",
            [user, page ]
        );

        console.log("Log successfully updated");
        res.json({ message: "successfully updated" });
    } catch (error) {
        console.error("Log failed to updated:", error);
        res.status(500).json({ message: "Log failed to updated" });
    }
};

const brochures = [
    { id: 1, name: "Cell Culture Guide", category: "Cell Biology" },
    { id: 2, name: "Stem Cell Handbook", category: "Stem Cells" },
    { id: 3, name: "Protein Purification Manual", category: "Biochemistry" },
    { id: 4, name: "Immunology Basics", category: "Immunology" },
];

const search = (req, res) => {
    const searchQuery = req.query.search?.toLowerCase();

    if (!searchQuery) {
        return res.status(400).json({ error: "Search query is required" });
    }

    const results = brochures.filter((item) =>
        item.name.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery)
    );

    res.json(results);
};

module.exports = { getCountries, getPdfs, getBrochure, getSubcats, updateLog };