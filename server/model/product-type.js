const mongoose = require('mongoose')

const productsTypeSchema = new mongoose.Schema({
    product_type_id: String,
    product_type_name: String,
    description: String
})

const productType = mongoose.model('productType', productsTypeSchema, 'productType');
module.exports = productType;
