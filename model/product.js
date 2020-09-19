const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    availableSizes: {
        type: [String],
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Brand'
    }
});

module.exports = mongoose.model('Product', productSchema);