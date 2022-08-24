const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const donationSchema = new Schema({
    uid: Number,
    donorName: String,
    Hospital: String,
    Doctor: String,
    slNo: Number,
    mfd: Date,
    recordAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('donation', donationSchema, 'Donor');  //'Donation' model name & 'Donation' collection name created in DB