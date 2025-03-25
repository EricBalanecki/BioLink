require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

// Configure CORS
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Serve static files from React frontend build
const buildPath = path.join(__dirname, '../build'); 
app.use(express.static(buildPath));
app.use('/public', express.static(path.join(__dirname, '../public')));

// Import routes
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");

// Use routes
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/orders", orderRoutes);



// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(express.json()); // Parses JSON bodies
app.use(fileUpload({ createParentPath: true })); // Enables file upload
app.use(express.static(path.join(__dirname, "public"))); // Serves static files

const pdfRoutes = require("./routes/pdfRoutes"); // Import PDF routes
app.use("/api/pdfs", pdfRoutes); // Mount PDF routes

const commonRoutes = require("./routes/common");
app.use("/common", commonRoutes);

const downloadRoutes = require("./routes/download");
app.use("/download", downloadRoutes);

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);


// Serve React frontend for all remaining requests
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
