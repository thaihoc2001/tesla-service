require('dotenv').config();
module.exports = {
    DB: {
        database: process.env.DB_DATABASE_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        CONFIG: {
            host: 'my-database-tesla.cn5tyhlgjnd6.us-west-2.rds.amazonaws.com',
            ssl: true,
            dialect: "postgres",
            dialectOptions: {
                ssl: {
                    rejectUnauthorized: false
                }
            },
            logging: console.log,
        }
    }
};
