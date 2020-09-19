const mongoose = require('mongoose');

const shipmentInforSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    shipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Shipment'
    }
});

module.exports = mongoose.model('ShipmentInfor', shipmentInforSchema);