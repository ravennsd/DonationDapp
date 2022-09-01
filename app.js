const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const dotenv = require('dotenv').config();


Web3 = require("web3");


// web3 path


//const web3 = new Web3('http://localhost:8545');
//const web3= new Web3(window.web3.currentProvider);
//const contractAddress = DonationJSON.networks['5777'].address;
//Donation = new web3.eth.Contract(contractAbi, contractAddress);


// // Infura configuration
const HDWalletProvider = require('@truffle/hdwallet-provider');
//const infuraKey = "a89a3b1fa58841ae817fdd4944b78df6";
const mnemonic = "interest later goose elite unusual galaxy claw display balance response angry beach";
const addressIndex = 0;
const numberofAddresses = 1;
const provider = new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/a89a3b1fa58841ae817fdd4944b78df6`, addressIndex, numberofAddresses);
//const provider = new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/a89a3b1fa58841ae817fdd4944b78df6`, addressIndex, numberofAddresses);

var DonationJSON = require(path.join(__dirname, 'build/contracts/Donation.json'));
web3 = new Web3(provider);

//accountAddress = "0x6b3016683BC99E6f57402418c64dc5073c8b4B23";
accountAddress= "0x958c266da218BADd303d6f6b91f4d67A12930117";
contractAddress = DonationJSON.networks['3'].address;

const contractAbi = DonationJSON.abi;
DonationContract = new web3.eth.Contract(contractAbi, contractAddress);

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const donationRouter = require('./routes/donation');
const patientsRouter = require('./routes/patient');
const paymentRouter = require('./routes/payment');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routing paths
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/donation', donationRouter);
app.use('/patient', patientsRouter);
app.use('/payment', paymentRouter);
// app.use('/verify', patientsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
