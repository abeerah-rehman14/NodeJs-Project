const asyncHandler = require('express-async-handler')  
const Category = require('../models/categoryModel') 
const mongoose = require('mongoose') 



// GET /api/category
const getCategory = asyncHandler (async (req,res)=> {
    const category = await Category.find()
        .populate('parentCategory', 'name')
        .populate('subCategory', 'name')
    if(!category)
    {
        res.status(400)
        throw new Error('Category not found') 
    }
    res.status(200).json(category)
})


// POST /api/category
const addCategory = asyncHandler(async (req, res) =>{
    const category = new Category(req.body) 
    if(!category.name)
    {
        res.status(400)
        throw new Error('Name is required') 
    }
   
    const newCategory = await Category.create(category)
    res.status(201).json(newCategory)
}) 

// GET /api/category/id
const getCategoryById = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id) 

    if (!isValidObjectId) {
        res.status(400)
        throw new Error('Invalid ID format') 
    }
    else{
        const category = await Category.findById(req.params.id)
            .populate('parentCategory', 'name')
            .populate('subCategory', 'name')
        if(!category)
        {
            res.status(404)
            throw new Error('Category is not found') 
        }
        res.status(200).json(category)
    }
}) 

// PUT /api/category/id
const updateCategory = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id) 
    if (!isValidObjectId) {
        res.status(400)
        throw new Error('Invalid ID format') 
    }
    else{
        const category = await Category.findById(req.params.id)
        if(!category)
        {
            res.status(404)
            throw new Error('Category is not found') 
        }
        else
        {
            const updateCategory = await Category.findByIdAndUpdate(req.params.id,req.body, {new: true}) 
            res.status(200).json(updateCategory)
        }
    }

})

// DELETE /api/category/id
const deleteCategory = asyncHandler( async (req, res) =>{
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id) 
    if (!isValidObjectId) {
        res.status(400)
        throw new Error('Invalid ID format') 
    }
    else{
        const category = await Category.findById(req.params.id)
        if(!category)
        {
            res.status(404)
            throw new Error('Category is not found') 
        }
        else
        {
            await Category.findByIdAndDelete(req.params.id) 
            res.status(200).json({ message: 'Category is deleted successfully' })
        }
    }

})

module.exports = {getCategory, addCategory, getCategoryById, updateCategory, deleteCategory}