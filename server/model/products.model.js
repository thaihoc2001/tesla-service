const mongoose = require('mongoose')
const Image = require('./data_type/imagesProduct.model')

const product = new mongoose.Schema({
    product_id: String,
    product_name: String,
    price_value: Number,
    discount: Number,
    images: [Image],
    description: String,
    start_date: Date,
    list_promotion_id: [],
    product_category_id: String,
    product_type_id: String,
    image_thumbnail: Image
})

const productModel = mongoose.model('Product', product, 'product')
module.exports = productModel;
