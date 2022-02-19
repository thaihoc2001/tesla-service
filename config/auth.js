require('dotenv').config();
module.exports = {
    AUTH_TOKEN_SECRET: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET
    },
    LIFE_TIME_TOKEN: {
        ACCESS_TOKEN: process.env.LIFE_TIME_ACCESS_TOKEN,
        REFRESH_TOKEN: process.env.LIFE_TIME_REFRESH_TOKEN
    }
}
