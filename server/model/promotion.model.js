const mongoose = require('mongoose')
const Image = require('./data_type/imagesProduct.model')

const promotion = new mongoose.Schema({
    promotion_id: String,
    promotion_name: String,
    image: Image,
    description: String,
})

const promotionModel = mongoose.model('Promotion', promotion, 'promotion')
module.exports = promotionModel;
