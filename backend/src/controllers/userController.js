const { pool } = require("../connect");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Check if the user exists with the given email and password
        let [rows] = await pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

        // If user is not found, check if it's a Sino Biological email and create an account if necessary
        if (rows.length === 0) {
            if (email.includes("@sinobiological") && password == '7898') {
                await pool.query("INSERT INTO users (email) VALUES (?)", [email]);

                // Fetch the newly created user (assuming default password exists in the table)
                [rows] = await pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

                if (rows.length === 0) {
                    return res.status(500).json({ error: "Invalid password" });
                }
            } else {
                return res.status(401).json({ error: "Invalid credentials" });
            }
        }

        const user = rows[0];

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user.id, email: user.email, import: user.import }, // Payload
            process.env.JWT_SECRET, // Secret key (stored in .env)
        );

        res.json({ message: "Login successful", token, email: user.email, import: user.import });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { login };
