const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.connect("mmongodb+srv://Neethu01:Mongo0101@cluster0.i933t.mongodb.net/?retryWrites=true&w=majority");
const patientSchema = new Schema({
  uid: Number,
  name: {
    type: String
    // required: [true, 'Name is required']
  },
  gender: {
    type: String,
    //required: [true, 'Gender is required'],
   
  },
  age: Number,
  dateOfBirth: Date,
  phone: Number,
  address: String
});

module.exports = mongoose.model('patient', patientSchema, 'Patients');  //'patient' model name & 'Patients' collection name created in DB