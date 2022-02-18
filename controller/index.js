const user = require('./user');
const auth = require('./auth');
const categories = require('./categories');
const productType = require('./product-type');
const image = require('./image');
const product = require('./product')
module.exports = {
    ...user,
    ...auth,
    ...categories,
    ...productType,
    ...image,
    ...product
}
