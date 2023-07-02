const mongoose = require('mongoose')


const categorySchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    parentCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required: false,

    },
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
   
})

module.exports = mongoose.model('Category',categorySchema)