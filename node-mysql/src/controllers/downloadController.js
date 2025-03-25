const { tryCatchWrapper } = require("../tryCatchWrapper");
const path = require('path');

const downloadPDF = tryCatchWrapper(async (req, res, next) => {
    try {
        const brochureName = req.query.brochureName;
        const category = req.query.category;
        const subcategory = req.query.subcategory

        console.log(brochureName);

        if (!brochureName || !category || !subcategory) {
            return res.status(400).json({ error: "Missing required parameters." });
        }
        
        const filePath = path.join(__dirname, "../../public/pdfs", category, subcategory, brochureName);

        console.log("Downloading file:", filePath);


        res.download(filePath, brochureName, (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ error: "Error downloading file." });
            }
        });
        
    } catch (err) {
        next(err); // Pass any errors to the next middleware
    }

});




module.exports = { downloadPDF };