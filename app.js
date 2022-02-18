const express = require('express');
const cors = require('cors');

const userRouter = require('./router/user');
const authRouter = require('./router/auth');
const categoriesRouter = require('./router/categories');
const productTypeRouter = require('./router/product-type');
const productRouter = require('./router/product');
const imageRouter = require('./router/image');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/categories',categoriesRouter);
app.use('/api/product-type',productTypeRouter);
app.use('/api/products',productRouter);
app.use('/api/images',imageRouter);
app.get('/health', (req, res) => res.status(200).send('tesla service'));

module.exports = app;
