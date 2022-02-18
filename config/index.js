const db = require('./db')
const auth = require('./auth')
const container = require('./container')
const cloudinary = require('./clouddinary')
module.exports = {
    ...db,
    ...auth,
    ...container,
    ...cloudinary
};
