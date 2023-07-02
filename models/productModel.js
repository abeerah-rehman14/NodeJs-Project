const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    descrption : {
        type : String,
        required: false,
    },
    quantity : {
        type : Number,
        required: true,
    },
    color : {
        type : String,
        required: false,
    },
    price : {
        type : Number,
        required: true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required: true,

    }
});

productSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

productSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Product',productSchema)