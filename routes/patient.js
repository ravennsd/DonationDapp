const express = require('express');
const { get } = require('mongoose');
//const app= express();
Web3 = require('web3');
const PatientRouter = express.Router();
const PatientData = require('../model/patientData');
const donationBCTxn = require("./donationBCTxn");

//var DonationJSON = require(path.join(__dirname, 'build/contracts/Donation.json'));

/* POST patient details. */
PatientRouter.get('/get', function (req, res, next) {
  const data = req.body;
  console.log("data" +data)
  PatientData.findOne({ uid: data.uid }, (err, patientRecords) => {
    if (err) {
      console.log(err)
    } else {
      if (!(patientRecords)) {
        res.status(404).send("Record Not Found");
        console.log("Record Not Found");
      }
      else {
        console.log("records:" +patientRecords);
        res.status(200).render('revisit', { pRecord: patientRecords }) .catch(_err => {
            res.status(400).send("Unable to Read the Database");
           });          
      }
    }
  });
});

/* POST add patient. */
PatientRouter.post('/add', function (req, res, next) {
  const data = req.body;
  const name = data.firstName + ' ' + data.lastName;
  const address = data.city + ', ' + data.state + ', ' + data.pincode;
  const recordData = {
    uid: data.uid,
    name: name,
    age: data.age,
    gender: data.gender,
    dateOfBirth: data.dob,
    phone: data.phone,
    address: address
  }

  //Gender variable for contract
  if (data.gender == 'Male') {
    sex = 0;
  }
  else if (data.gender == 'Female') {
    sex = 1;
  }
  else { sex = 2; }

  record = new PatientData(recordData);
  record.save((err, patientRecord) => {
    // await function getAccounts(){
    //   accounts = 
    // }

    DonationContract.methods.setPatient(data.uid, name, data.age, sex, address)
      .send({from : accountAddress, gasLimit : "927000"}).then((txn) => {
        console.log("txn" +JSON.stringify(txn));
        if (err) {
        console.log(err);
      } else {
        console.log(patientRecord);
        res.status(200).render('revisit',{pRecord: patientRecord});
      }
        
      })
    });
  
  });
  PatientRouter.post('/verify', function (req, res, next) {
    const data = req.body;
   console.log("body" +(JSON.stringify(data)));
   
  

      DonationContract.methods.getPatient(data.uid)
        .call({ from: accountAddress, gas: 257685 })
        .then((txn) => {

          console.log("txn will be" +JSON.stringify(txn));

          

          PatientData.findOne({ uid: data.uid }, (err, patientRecords) => {

            
            if (err) {
              console.log(err)
            } else {
              if (!(patientRecords)) {
                res.status(404).send("Record Not Found");
                console.log("Record Not Found");
              }
              else {
                console.log("Txn" +txn);
                console.log(txn[3]);
                
            
              if (txn[3] == 0){
                 
                 txn[3] = 'Male'
                }
              else if(txn[3] == 1){
                
                txn[3] = 'Female';
              }
              else {
                txn[3] = 'Others';
              }
          
          
                // res.status(200).send(txn);
                res.status(200).render("verifyPatient",{DPD : txn});
                console.log("records" +patientRecords);
                         
            
          }

        }
        });
        
      })
    });

/* POST Update patient. */
PatientRouter.post('/update', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = PatientRouter;


