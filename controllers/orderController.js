const asyncHandler = require('express-async-handler'); 
const Order = require("../models/orderModel") 
const Cart = require("../models/cartModel") 
const Product = require("../models/productModel") 

const mongoose = require('mongoose');



//GET /api/orders/
const getOrders = asyncHandler (async (req,res)=> {
    const order = await Order.find().populate("user", "name")
    .populate("cartItem")
    .populate({path: "cartItem",populate: "product"}) //{path: "product",populate: "category"}
    if(!order)
    {
        res.status(400)
        throw new Error("Orders not found");
    }
    res.status(200).json(order)
})


//POST /api/orders/
const addOrder = asyncHandler(async (req, res) =>{

    const cart = await Promise.all(req.body.cartItem.map(async (cartItem) => {
      return await addCartItem(cartItem, res)
    }) )
    let totalAmount = 0

    for (const cartItem of cart) {
        const item = await Cart.findById(cartItem).populate({ path: "product", select: "price quantity" });
        totalAmount += item.product.price * item.quantity;
      }
          
    const order = new Order({
        user : req.user.id,
        address : req.body.address,
        cartItem : cart,
        totalAmount : totalAmount

    });

    if(!order.user || !order.address || order.cartItem.length === 0)
    {
        res.status(400)
        throw new Error("User details , address and cart items are required");
    }
    
   const newOrder = await Order.create(order)
   if(newOrder)
   {
    for (const cart of newOrder.cartItem) {
        const item = await Cart.findById(cart).populate({ path: "product", select: "price quantity" });
        const product = await Product.findByIdAndUpdate(
            { _id: item.product._id },
            { $inc: { quantity: -item.quantity } },
            { new: true }
        )
        console.log("Update product with qunatity" +product);
      }
   }
   res.status(201).json({msg : "Order has been placed" , Order : order})
});

const addCartItem = asyncHandler (async (req,res) => {
    
    const cartItem = new Cart({
        product : req.product,
        quantity : req.quantity,

    });

    if(!cartItem.product || !cartItem.quantity)
    {
        res.status(400)
        throw new Error("Cart is empty");
    }

    const product = await Product.findById(req.product)
    if(product && product.quantity < req.quantity)
    {
        res.status(404)
        throw new Error("Product requied quantity is not available");
    }
   
   const newItem = await Cart.create(cartItem)
   return newItem._id.toString();

})

//GET /api/orders/id
const getOrderById = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidObjectId) {
        res.status(400)
        throw new Error("Invalid ID format");
    }
    else{
        const order = await Order.findById(req.params.id)
        if(!order)
        {
            res.status(404)
            throw new Error("Order is not found");
        }
        res.status(200).json(order)
    }
});


//PUT /api/orders/id
const updateOrder = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        res.status(400)
        throw new Error("Invalid ID format");
    }
    else{
        const order = await Order.findById(req.params.id)
        if(!order)
        {
            res.status(404)
            throw new Error("Order is not found");
        }
        else
        {
            const updateOrder = await Order.findByIdAndUpdate(req.params.id,req.body, {new: true});
            res.status(200).json(updateOrder)
        }
    }

})

//DELETE  /api/orders/id
const deleteOrder = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        res.status(400)
        throw new Error("Invalid ID format");
    }
    else{
        const order = await Order.findById(req.params.id)
        if(!order)
        {
            res.status(404)
            throw new Error("Order is not found");
        }
        else
        {
            await order.cartItem.forEach(async item => {
               const cart =  await Cart.findByIdAndDelete(item.id)
               res.send("Cart Item is deleted")
                
            });
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Order is deleted successfully' })
        }
    }

})

module.exports = {getOrders, addOrder, getOrderById, updateOrder, deleteOrder}