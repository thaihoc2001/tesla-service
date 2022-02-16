const app = require('./app');

const config = require('./config');

const server = app.listen(config.port, '0.0.0.0', async () => {
    console.log('server start');
});
