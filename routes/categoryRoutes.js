const express = require("express");
const router = express.Router();

const {getCategory, addCategory, getCategoryById, updateCategory, deleteCategory}
= require("../controllers/categoryController");
const validateToken = require('../middleware/validateUser');

router.use(validateToken)
 
router.route("/").get(getCategory).post(addCategory);
router.route("/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);



 module.exports = router;   