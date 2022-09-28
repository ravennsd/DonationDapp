const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.connect("mmongodb+srv://Neethu01:Mongo0101@cluster0.i933t.mongodb.net/?retryWrites=true&w=majority");
// const donationSchema = new Schema({
//     uid: Number,
//     dData: String

// });
const donationSchema = new Schema({
    uid: Number,
    name: {type: String},
    hospital: {type: String},
    organ: String,
    doctor: String,
    slNo: Number,
    Date: Date,
    recordAdded: { type: Date, default: Date.now }

});

module.exports = mongoose.model('donation', donationSchema, 'Donations');  //'Donation' model name & 'Donation' collection name created in DB