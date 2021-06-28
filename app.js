const express = require('express');
const path = require('path');

const cameraRoutes = require('./routes/camera');
const teddyRoutes = require('./routes/teddy');
const furnitureRoutes = require('./routes/furniture');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// definition des routes front 
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/product/:uuid', express.static(path.join(__dirname, 'public/html/product.html')));
app.use('/order', express.static(path.join(__dirname, 'public/html/order.html')));
app.use('/congrats/:orderId', express.static(path.join(__dirname, 'public/html/order-congrats.html')));


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/cameras', cameraRoutes);
app.use('/api/teddies', teddyRoutes);
app.use('/api/furniture', furnitureRoutes);


module.exports = app;