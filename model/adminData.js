const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect("mmongodb+srv://Neethu01:Mongo0101@cluster0.i933t.mongodb.net/?retryWrites=true&w=majority");

const adminSchema = new Schema({
    email: String,
    password: String
});

module.exports = mongoose.model('admin', adminSchema, 'admin');