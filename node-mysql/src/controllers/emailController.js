const nodemailer = require('nodemailer');
const { pool } = require("../connect");
const dotenv = require("dotenv");


// Configure the transporter
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, 
    port: process.env.MAIL_PORT, 
    secure: false, 
    auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASSWORD,   
    },
});

const addID = async (item, to, from) => {
    // Insert info into data base
    const [result] = await pool.query("INSERT into links (rcv_email, sender, brochure_name) VALUES (?, ?, ?)",
        [to, from, item.name]
    )

    // Get the auto-generated ID
    const insertedId = result.insertId;

    return { ...item, link: item.link.concat("/", insertedId) };
}

// Email sending function
const sendEmail = async (req, res) => {
    console.log(" Received body:", req.body);

    const { to, subject, items, sender } = req.body; 

    console.log(" Received 'to':", to);
    console.log("Received 'subject':", subject);
    console.log("Received 'links' (Type):", typeof items);
    console.log("Received 'links' (Content):", items);

    if (!to || !subject || !items || !sender || !Array.isArray(items)) {
        console.error("❌ Error: 'links' is not an array", { to, subject, items });
        return res.status(400).json({ error: "Missing required fields: to, subject, links must be an array" });
    }

    try {
        const idLinks = await Promise.all(items.map(item => addID(item, to, sender)));

        const message = `Dear Valued Customer,\n\nThank you for your interest in Sino Biological’s products and services. Below, you will find the brochures you requested. Please click on the link to view and download the PDF file:\n\n${idLinks
            .map(item => `${item.name}:\n${item.link}`)
            .join("\n\n")}\n\nBest regards,\nSino Biological`;
        

        const info = await transporter.sendMail({
            from: '"Sino Biological"',
            to: to,
            subject: 'Your Requested Brochures from Sino Biological',
            text: message, 
        });

        console.log("📧 Email sent:", info.messageId);
        res.json({ message: "Email sent successfully", info });

    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};

// Updates database when links are opened
const linkOpened = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: "Missing required fields: id" });
    }

    try {
        const [rows] = await pool.query("SELECT * FROM links WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Item not found." });
        }

        // Check if already marked as opened
        if (rows[0].returned === 1) {
            return res.json({ success: true, message: "Link was already marked as opened." });
        }

        // Mark as opened and set timestamp
        await pool.query("UPDATE links SET returned = 1, clicked_time = NOW() WHERE id = ?", [id]);

        const now = new Date();
        const formattedTimestamp = now.toString();
        const clickedDate = new Date().toLocaleString(); 

        const info = await transporter.sendMail({
            from: 'Sino Biological',
            to: rows[0].sender,
            subject: `BioLink notification - Brochure URL link clicked (${rows[0].rcv_email})`,
            text: `Hi ${rows[0].sender} \nYour shared brochure URL link is clicked
                        \nBrochure: ${rows[0].brochure_name}
                        \nCustomer email: ${rows[0].rcv_email}
                        \nShared Date: ${rows[0].sent_time}
                        \nClicked Date: ${formattedTimestamp}`, 
        });

        res.json({
            success: true,
            message: "Link marked as opened with timestamp.",
            emailInfo: info,
        });
        console.log("📧 Email sent:", info.messageId);
        

    } catch (error) {
        console.error("Error updating link:", error);
        res.status(500).json({ error: "Failed to update link" });
    }
};

module.exports = { sendEmail, linkOpened };
