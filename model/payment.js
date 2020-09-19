const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    paymentMethodId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'PaymentMethod'
    }
});

module.exports = mongoose.model('Payment', paymentSchema);