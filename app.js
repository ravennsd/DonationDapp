const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
Web3 = require("web3");
// web3 path
// const web3 = new Web3('http://localhost:8545');
var DonationJSON = require(path.join(__dirname, 'build/contracts/Donation.json'));
// // const web3= new Web3(web3.currentProvider);
// const contractAddress = DonationJSON.networks['5777'].address;
// const contractAbi = DonationJSON.abi;

// DonationContract = new web3.eth.Contract(contractAbi, contractAddress);


// Infura configduration
const infuraKey = "a89a3b1fa58841ae817fdd4944b78df6";
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = "interest later goose elite unusual galaxy claw display balance response angry beach";
const addressIndex = 0;
const numberofAddresses = 1;
const provider = new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/66143caa10564dea879e148c7810433b`, addressIndex, numberofAddresses);


web3 = new Web3(provider);

accountAddress= "0x958c266da218BADd303d6f6b91f4d67A12930117";
contractAddress = DonationJSON.networks['5'].address;

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
