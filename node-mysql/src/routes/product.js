const express = require("express");
const router = express.Router();

const { getProducts, getProduct, getProductsTable, editProduct } = require("../controllers/productController");

router.get("", getProducts);
router.get("/table", getProductsTable);

router.get("/:id", getProduct);
router.patch("/:id", editProduct);

module.exports = router;