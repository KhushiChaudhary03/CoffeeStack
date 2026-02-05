const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/*  ADMIN CHECK */
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

/*  TOTAL ORDERS */
router.get("/stats/orders", authMiddleware, adminOnly, async (req, res) => {
  const totalOrders = await Order.countDocuments();
  res.json({ totalOrders });
});

/*  TOTAL REVENUE */
router.get("/stats/revenue", authMiddleware, adminOnly, async (req, res) => {
  const revenue = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  res.json({ revenue: revenue[0]?.total || 0 });
});

/* MOST ORDERED ITEMS */
router.get("/stats/popular", authMiddleware, adminOnly, async (req, res) => {
  const popular = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.name",
        quantity: { $sum: "$items.quantity" },
      },
    },
    { $sort: { quantity: -1 } },
  ]);

  res.json(popular);
});

module.exports = router;
