const express = require('express');
const cors = require('cors');

const userRouter = require('./router/user');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users',userRouter);

app.get('/health', (req, res) => res.status(200).send('tesla service'));

module.exports = app;
