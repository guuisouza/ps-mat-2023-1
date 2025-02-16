//Carrega as váriaveis de ambiente do arquivo .env para a aplicação.
require ('dotenv').config()


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
//Habilita de qualquer origem de front-end possa acessar o back-end
const cors = require('cors')
app.use(cors({
    origin: process.env.FRONT_ORIGIN,
    credentials: true //Exige o envio de cookie com credenciais
}))

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

//Chama a verificação de autenticação para qualquer rota
const auth = require('./lib/auth')
app.use(auth)

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

const tags = require('./routes/tags')
app.use('/tags', tags)

const customerTags = require('./routes/customer_tags')
app.use('/customer_tags', customerTags)

const customers = require('./routes/customers')
app.use('/customers', customers)

const cities = require('./routes/cities')
app.use('/cities', cities)

const orderStatuses = require('./routes/order_statuses')
app.use('/order_statuses', orderStatuses)

const orderRelStatuses = require('./routes/order_rel_statuses')
app.use('/order_rel_statuses', orderRelStatuses)

const orders = require('./routes/orders')
app.use('/orders', orders)

const suppliers = require('./routes/suppliers')
app.use('/suppliers', suppliers)

const products = require('./routes/products')
app.use('/products', products)

module.exports = app;
