const express = require('express');
const router = express.Router();
const {loginUser, registerUser,getUserDetails}  = require("../controllers/authController");
const validateToken = require('../middleware/validateUser');


router.post('/login', loginUser);
router.post('/register', registerUser);

router.get('/loginUserDetails', validateToken, getUserDetails);


module.exports = router;