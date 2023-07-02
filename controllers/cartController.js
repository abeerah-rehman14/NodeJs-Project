const asyncHandler = require('express-async-handler'); 
const Cart = require("../models/cartModel") 

const mongoose = require('mongoose');

// GET /api/cart/
const getCarts = asyncHandler (async (req,res)=> {
    const cart = await Cart.find()
    if(!cart)
    {
        res.status(400)
        throw new Error("Carts not found");
    }
    res.status(200).json(cart)
})


// POST /api/cart/
const addCart = asyncHandler (async (req,res) => {
    
    const cartItem = new Cart({
        product : req.body.product,
        quantity : req.body.quantity,

    });

    if(!cartItem.product || !cartItem.quantity)
    {
        res.status(400)
        throw new Error("Cart is empty");
    }
   
   const newItem = await Cart.create(cartItem)
   res.status(201).json(newItem)
7
})

// GET /api/cart/id
const getCartById = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidObjectId) {
        res.status(400)
        throw new Error("Invalid ID format");
    }
    else{
        const cart = await Cart.findById(req.params.id)
        if(!cart)
        {
            res.status(404)
            throw new Error("Cart is not found");
        }
        res.status(200).json(cart)
    }
});

// PUT /api/cart/id
const updateCart = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        res.status(400)
        throw new Error("Invalid ID format");
    }
    else{
        const cart = await Cart.findById(req.params.id)
        if(!cart)
        {
            res.status(404)
            throw new Error("Cart is not found");
        }
        else
        {
            const updateCart = await Cart.findByIdAndUpdate(req.params.id,req.body, {new: true});
            res.status(200).json(updateCart)
        }
    }

})
// DELETE /api/cart/id
const deleteCart = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        res.status(400)
        throw new Error("Invalid ID format");
    }
    else{
        const cart = await Cart.findById(req.params.id)
        if(!cart)
        {
            res.status(404)
            throw new Error("Cart is not found");
        }
        else
        {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Cart is deleted successfully' })
        }
    }

})

module.exports = {getCarts, addCart, getCartById, updateCart, deleteCart}