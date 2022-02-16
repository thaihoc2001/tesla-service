require('dotenv').config();
module.exports = {
    DB: {
        URL: process.env.PRODUCTION_DATABASE_URL,
        CONFIG: {
            logging: true,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    }
};
