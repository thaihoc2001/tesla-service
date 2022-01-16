const mongoose = require('mongoose')


const rating = new mongoose.Schema({
    rating_id: mongoose.ObjectId,
    rating_name: String,
    quantity: Number,
    product_id: String,
    person_rating_name: String,
    content_rating: String,
    start_date: Date
})

const promotionModel = mongoose.model('Promotion', promotion, 'promotion')
module.exports = promotionModel;
