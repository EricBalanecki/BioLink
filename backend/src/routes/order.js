const express = require("express");
const router = express.Router();

const { getOrders, createOrder, getNewOrders, getUnverifiedOrders } = require("../controllers/orderController");

router.get("", getOrders);
router.get("/new_orders", getNewOrders);
router.get("/unverified_orders", getUnverifiedOrders);


router.post("/create", createOrder)

module.exports = router;