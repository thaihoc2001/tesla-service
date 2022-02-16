const db = require('./db')
const auth = require('./auth')
const container = require('./container')

module.exports = {
    ...db,
    ...auth,
    ...container,
};
