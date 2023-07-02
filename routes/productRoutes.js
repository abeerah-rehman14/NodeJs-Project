const express = require("express");
const router = express.Router();

const {getProducts, addProduct, getProduct, getProductsByCategory, updateProduct, deleteProduct}
= require("../controllers/productController");
const validateToken = require('../middleware/validateUser');

router.use(validateToken)
 
router.route("/").get(getProducts).post(addProduct).get(getProductsByCategory);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);



 module.exports = router;   