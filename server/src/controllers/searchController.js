const { pool } = require("../connect");

const search = async (req, res) => {
    const searchQuery = req.query.search?.toLowerCase();

    if (!searchQuery) {
        return res.status(400).json({ error: "Search query is required" });
    }

    try {
        // Search the database for matching PDFs or subcategories
        const [results] = await pool.query(
            `SELECT id, name, category, subcategory, file_path 
             FROM brochures 
             WHERE LOWER(name) LIKE ? 
             OR LOWER(category) LIKE ? 
             OR LOWER(subcategory) LIKE ?`,
            [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`]
        );

        if (results.length === 0) {
            return res.json({ message: "No matching results found." });
        }

        // Format results
        const formattedResults = results.map(row => ({
            type: "pdf",
            id: row.id,
            name: row.name,
            category: row.category,
            subcategory: row.subcategory,
            filePath: row.file_path
        }));

        return res.json(formattedResults);
    } catch (err) {
        console.error("Database search error:", err);
        return res.status(500).json({ error: "Server error. Check logs for details." });
    }
};

module.exports = { search };
