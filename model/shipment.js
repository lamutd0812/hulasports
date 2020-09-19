const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    shipmentMethodId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ShipmentMethod'
    },
    status: [{
        timestone: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Shipment', shipmentSchema);