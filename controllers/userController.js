const asyncHandler = require('express-async-handler'); 
const User = require("../models/userModel") 
const mongoose = require('mongoose');

//user controler
//@ get api/users
//access public

const getUsers = asyncHandler(async (req, res) =>{
    const users = await User.find()
    res.status(200).json(users)
})

//create a new user
//@ post api/users
//access public
const createUser = asyncHandler(async (req, res) =>{
    const {name,email,password} = req.body;
    if(!name || !email || !password)
    {
        res.status(400)
        throw new Error("Invalid input");
    }
    const newUser = await User.create({name:name,email:email,password:password})
    res.status(201).json(newUser)
});

const getUser = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        res.status(400)
        throw new Error("Invalid ID format");
    }
    else{
        const user = await User.findById(req.params.id)
        if(!user)
        {
            res.status(404)
            throw new Error("User not found");
        }
        res.status(200).json(user)
    }
});


const updateUser = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        res.status(400)
        throw new Error("Invalid ID format");
    }
    else{
        const user = await User.findById(req.params.id)
        if(!user)
        {
            res.status(404)
            throw new Error("User not found");
        }
        else
        {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body, {new: true});
            res.status(200).json(updatedUser)
        }
    }

})

const deleteUser = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        res.status(400)
        throw new Error("Invalid ID format");
    }
    else{
        const user = await User.findById(req.params.id)
        if(!user)
        {
            res.status(404)
            throw new Error("User not found");
        }
        else
        {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'User deleted successfully' })
        }
    }

})

module.exports = {getUsers, createUser, getUser, updateUser, deleteUser}