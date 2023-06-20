const asyncHandler = require("express-async-handler");
const User = require("../models/userModel") 
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body
    if(!email ||!password){
        res.status(400)
        throw new Error("Please enter email and password")
    }
   
    const user = await User.findOne({email: email})
    console.log("here",user.email)
    if(user && (await bcrypt.compare(password, user.password)))
    {
        
        const token = jwt.sign({
            user : {
                id: user._id,
                name: user.name,
                email: user.email
            }
        }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "15m"})

        res.status(200).json({token})
    }
    else{
        res.status(401)
        throw new Error("Invalid Credentials")
    }

}
)


const registerUser = asyncHandler( async (req, res) => {
    const {name, email,password} = req.body
    if(!name || !email || !password)
    {
        res.status(400)
        throw new Error("Please enter all fields")
    }
    const emailCheck = await User.findOne({email: email})
    if(emailCheck)
    {
        res.status(400)
        throw new Error("User already exists")
    }
    //const hashedPassword = await bcrypt.hash(password, 10) will implement this later
    const newUser = await User.create({name,email,password:password})
    if(newUser){
        res.status(201).json({email: newUser.email})
    }
    else
    {
        res.status(400)
        throw new Error("Invalid Data")
    }
    
    
}
)

const getUserDetails = asyncHandler( async (req, res) => {
    console.log(req.headers)
    res.status(200).json(req.user)
    //res.status(200).json(req.user)
    
}
)

module.exports = {loginUser, registerUser, getUserDetails}