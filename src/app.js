const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');
const app = express();


//Router Middlewares
app.use(express.json());
app.use('/weather', weatherRoutes);

module.exports = app;
