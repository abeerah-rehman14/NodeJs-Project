const express = require("express");
const router = express.Router();

const {getOrders, addOrder, getOrderById, updateOrder, deleteOrder}
= require("../controllers/orderController");
const validateToken = require('../middleware/validateUser');

router.use(validateToken)
 
router.route("/").get(getOrders).post(addOrder)
router.route("/:id").get(getOrderById).put(updateOrder).delete(deleteOrder);



 module.exports = router;   