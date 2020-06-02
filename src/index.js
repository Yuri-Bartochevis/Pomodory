const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');
var logger = require('morgan');
const router = require('./routes/alexa-route');
const app = express();


app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(router);
dotEnv.config();

app.listen(process.env.APP_PORT, () => console.log(`${process.env.APP_NAME} listening on port ${process.env.APP_PORT}!`));

module.exports = app;