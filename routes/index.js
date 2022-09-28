var express = require('express');
var router = express.Router();
const store = require('store2');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Neethu01:Mongo0101@cluster0.i933t.mongodb.net/?retryWrites=true&w=majority");

/* authentication for loading the pages */
function authentiction() { //////////////////////////////////////
  return !!localStorage.getItem('token');
}

/* GET welcome route. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Donation-Dapp' });
});

// GET signIn route
router.get('/signIn', function (req, res, next) {
  res.render('signIn', { title: 'Donation-Dapp' });
});

// GET signUp route
router.get('/signUp', function (req, res, next) {
  res.render('signUp', { title: 'Donation-Dapp' });
});

// GET signOut route
router.get('/signOut', function (req, res, next) {
  store.clear();
  res.render('index', { title: 'Donation-Dapp' });
});

/* GET home route. */
router.get('/home', function (req, res, next) {
  res.render('home', { title: 'Donation-Dapp' });
});

/* GET new patient route. */
router.get('/new', function (req, res, next) {
  res.render('new', { title: 'Donation-Dapp' });
});

/* GET revist patient route. */
router.get('/revisit', function (req, res, next) {
  res.render('revisit', { title: 'Donation-Dapp' });
});

/* GET user route. */
router.get('/user', function (req, res, next) {
  const user = store.getAll().user;
  data = req.body;
  console.log(body);
  const name = user.fname + " " + user.lname;
  const phone = user.phone;
  const email = user.email;
  res.render('user', {
    title: 'Donation-Dapp',
    name: name,
    phone: phone,
    email: email
  });
});



/* GET dashboard route. */
router.get('/dashboard', function (req, res, next) {
  res.render('dashboard', { title: 'Donation-Dapp' });
});

/* GET verify patient route. */
router.get('/verifyPatient', function (req, res, next) {
  res.render('verifyPatient', { title: 'Donation-Dapp' });
});

/* GET DonationRecord route. */
router.get('/DonationRecord', function (req, res, next) {
  res.render('donationRecord', { title: 'Donation-Dapp' });
});
/* GET DonationRecord route. */
router.get('/verifyDonation', function (req, res, next) {
  res.render('verifyDonation', { title: 'Donation-Dapp' });
});

/* GET DonationRecords route. */
router.get('/previousDRs', function (req, res, next) {
  res.render('previousDRs', { title: 'Donation-Dapp' });
});

module.exports = router;
