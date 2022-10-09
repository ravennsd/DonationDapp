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
    organ: {type: String},
    hospital: {type: String},
    doctor: String,
    slNo: String
});

module.exports = mongoose.model('donation', donationSchema, 'Donations');  //'Donation' model name & 'Donation' collection name created in DB