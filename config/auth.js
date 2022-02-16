require('dotenv').config();
module.exports = {
    AUTH_TOKEN_SECRET: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET
    }
}
