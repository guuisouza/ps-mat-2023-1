//Carrega as váriaveis de ambiente do arquivo .env para a aplicação.
require ('dotenv').config()


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

//Conection BD 
const db = require('./models')

try{
    db.sequelize.authenticate()
    console.log('SEQUELIZE: connection has been established sucessfully')
}
catch(error){
    console.error('*SEQUELIZE: unable to connect to the database: ', error)
    process.exit(1) //Encerrar o servidor com erro
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/********************************/
const users = require('./routes/users')
app.use('/users', users)

const channels = require('./routes/channels')
app.use('/channels', channels)

const paymentMethods = require('./routes/payment_methods')
app.use('/payment_methods', paymentMethods)

const carriers = require('./routes/carriers')
app.use('/carriers', carriers)

const shipmentPriorities = require('./routes/shipment_priorities')
app.use('/shipment_priorities', shipmentPriorities)

const orderTags = require('./routes/order_tags')
app.use('/order_tags', orderTags)

module.exports = app;
