const mongoose = require('mongoose')
const Image = require('./data_type/image.model')

const promotion = new mongoose.Schema({
    promotion_id: mongoose.ObjectId,
    promotion_name: String,
    image: Image,
    description: String,
    product_id: String
})

const promotionModel = mongoose.model('Promotion', promotion, 'promotion')
module.exports = promotionModel;
