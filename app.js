const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

const app = express();

//routes

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS cofig
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// app.use('/api', authRoutes);
app.use(authRoutes);
app.use(shopRoutes);

mongoose.connect(config.db_uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(resutl => {
    app.listen(5000);
    console.log('server running at port 5000!');
}).catch(err => {
    console.log(err)
});