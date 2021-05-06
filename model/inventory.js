const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brandName: {
        type: String, required: true
    },
    productName: {
        type: String, required: true
    },
    quantity: {
        type: Number, required: true
    }
})
const Inventory = mongoose.model('Inventory', schema);

module.exports = Inventory;