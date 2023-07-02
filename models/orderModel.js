const mongoose = require("mongoose")


const orderSchema = mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,

    },
    cartItem : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Cart',
        required: true,

    }],
    address : {
        type : String,
        required: true,
    },
    totalAmount:{
        type : Number,
        default: 0,
        required: true

    }
});

orderSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

orderSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Order',orderSchema)