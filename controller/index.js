const user = require('./user');
const auth = require('./auth');
const categories = require('./categories');
const productType = require('./product-type');
const image = require('./image');
const product = require('./product')
const order = require('./orders');
const product_detail = require('./product_detail');
module.exports = {
    ...user,
    ...auth,
    ...categories,
    ...productType,
    ...image,
    ...product,
    ...order,
    ...product_detail
}
