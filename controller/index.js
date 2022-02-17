const user = require('./user');
const auth = require('./auth');
const categories = require('./categories');
const productType = require('./product-type');
module.exports = {
    ...user,
    ...auth,
    ...categories,
    ...productType
}
