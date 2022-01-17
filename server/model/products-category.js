const mongoose = require('mongoose')

const productsCategorySchema = new mongoose.Schema({
    products_category_id: String,
    product_category_name: String,
    description: String,
    product_type_id: String
})

const productCategory = mongoose.model('productCategory', productsCategorySchema, 'productCategory');
module.exports = productCategory;
