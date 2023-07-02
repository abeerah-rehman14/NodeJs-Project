const express = require('express') 
const router = express.Router() 

const {getCarts, addCart, getCartById, updateCart, deleteCart}
= require('../controllers/cartController') 
const validateToken = require('../middleware/validateUser') 

router.use(validateToken)
 
router.route('/').get(getCarts).post(addCart)
router.route('/:id').get(getCartById).put(updateCart).delete(deleteCart) 



module.exports = router    