const mongoose = require('mongoose')
const Image = require('./data_type/image.model')

const product = new mongoose.Schema({
    product_id: mongoose.ObjectId,
    product_name: String,
    price_value: Number,
    discount: Number,
    image: Image,
    description: String
})

const productModel = mongoose.model('Product', product, 'product')
module.exports = productModel;
