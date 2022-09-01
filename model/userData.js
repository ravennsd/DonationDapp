const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect("mongodb+srv://Neethu01:Mongo0101@cluster0.i933t.mongodb.net/?retryWrites=true&w=majority");
const userSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    phone: Number,
    password: String
});

module.exports = mongoose.model('user', userSchema, 'users');