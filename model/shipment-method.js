const mongoose = require('mongoose');

const shipmentMethodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('ShipmentMethod', shipmentMethodSchema);