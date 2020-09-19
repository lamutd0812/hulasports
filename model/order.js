const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        productTitle: {
            type: String,
            required: true
        },
        productImage: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        size: {
            type: String
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String
    }
});


module.exports = mongoose.model('Order', orderSchema);