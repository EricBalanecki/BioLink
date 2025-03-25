const dotenv = require("dotenv");
const mysql = require("mysql2/promise"); // Ensure promise version is used
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

module.exports = {
    pool,
};
