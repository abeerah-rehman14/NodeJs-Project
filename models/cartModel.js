const mongoose = require("mongoose")


const cartSchema = mongoose.Schema({
    product : {
        // type : 'String',
        // required : true
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required: true,

    },
    quantity : {
        type : Number,
        required: true,
    },
});

cartSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

cartSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Cart',cartSchema)