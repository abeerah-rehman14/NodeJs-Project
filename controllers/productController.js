const asyncHandler = require('express-async-handler')  
const Product = require('../models/productModel') 
const Category = require('../models/categoryModel') 

const mongoose = require('mongoose') 



// GET /api/products
const getProducts = asyncHandler (async (req,res)=> {
    const products = await Product.find().populate('category')
    if(!products)
    {
        res.status(400)
        throw new Error('Products not found') 
    }
    res.status(200).json(products)
})

// GET /api/products/id
const getProduct = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id) 
    

    if (!isValidObjectId) {
        res.status(400)
        throw new Error('Invalid ID format') 
    }
    else{
        const product = await Product.findById(req.params.id)
        if(!product)
        {
            res.status(404)
            throw new Error('Product is not found') 
        }
        res.status(200).json(product)
    }
}) 

//private for admin access

// POST /api/products 
const addProduct = asyncHandler(async (req, res) =>{
    const product = new Product(req.body) 
    if(!product.title || !product.quantity || !product.category || !product.price)
    {
        res.status(400)
        throw new Error('Title, quantity and category are required') 
    }

    const isValidObjectId = mongoose.Types.ObjectId.isValid(product.category) 

    if (!isValidObjectId) {
        res.status(400)
        throw new Error('Invalid Category ID format') 
    }
    else{
        const category = await Category.findById(product.category)
        if(!category)
        {
            res.status(404)
            throw new Error('Category is not found') 
        }
        try {
            const newProduct = await Product.create(product) 
            res.status(201).json(newProduct)
        }
        catch (error) {
            console.error('Error creating product:', error.message) 
            res.status(500)
            throw new Error('Error creating product') 
        }
         
        
    }    
}) 



// PUT /api/products/id
const updateProduct = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id) 
    if (!isValidObjectId) {
        res.status(400)
        throw new Error('Invalid ID format') 
    }
    else{
        const product = await Product.findById(req.params.id)
        if(!product)
        {
            res.status(404)
            throw new Error('Product is not found') 
        }
        else
        {
            const updateProduct = await Product.findByIdAndUpdate(req.params.id,req.body, {new: true}) 
            res.status(200).json(updateProduct)
        }
    }

})

// DELETE /api/products/id
const deleteProduct = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id) 
    if (!isValidObjectId) {
        res.status(400)
        throw new Error('Invalid ID format') 
    }
    else{
        const product = await Product.findById(req.params.id)
        if(!product)
        {
            res.status(404)
            throw new Error('Product is not found') 
        }
        else
        {
            await Product.findByIdAndDelete(req.params.id) 
            res.status(200).json({ message: 'Product is deleted successfully' })
        }
    }

})

//api/products?category=categoryID1,categoryID2

const getProductsByCategory = asyncHandler (async (req,res)=> {
    let filter = {}
    if(req.query.category)
    {
        filter = {category: req.query.category.split(',')}
    }

    const products = await Product.find(filter).populate('category')
    if(!products)
    {
        res.status(400)
        throw new Error('Products not found') 
    }
    res.status(200).json(products)
})



module.exports = {getProducts, addProduct, getProduct,getProductsByCategory, updateProduct, deleteProduct}