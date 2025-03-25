const XLSX = require('xlsx');
const { pool } = require('../connect');

const importExcel = async () => {
    try {
        console.log('Starting the import process.');

        // 1. Load the Excel file
        const workbook = XLSX.readFile('../../public/excel/pdf_metadata.xlsx'); // Adjust the path based on your structure
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert sheet to JSON

        console.log(`Loaded ${data.length} rows from the Excel file.`);

        // 2. Insert data into the database
        for (const row of data) {
            const { name, category, link, sub_category } = row;

            // Ensure all required fields are present
            if (!name || !category || !link || !sub_category || name == "") {
                console.error('Missing fields in row:', row);
                continue; // Skip this row
            }

            // Use the pool to insert data into the brochures table
            await pool.execute(
                'INSERT INTO brochures (name, category, link, sub_category) VALUES (?, ?, ?, ?)',
                [name, category, link, sub_category]
            );
        }

        console.log('Data imported successfully!');
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        // Close the pool to release database connections
        await pool.end();
        console.log('Database connection pool closed.');
    }
};

// Run the import script
importExcel();
