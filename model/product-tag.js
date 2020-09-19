const mongoose = require('mongoose');

const productTagSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    tagId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Tag'
    }
});

module.exports = mongoose.model('ProductTag', productTagSchema);
