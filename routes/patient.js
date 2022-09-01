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
  PatientData.findOne({ uid: data.uid }, (err, patientRecords) => {
    if (err) {
      console.log(err)
    } else {
      if (!(patientRecords)) {
        res.status(404).send("Record Not Found");
        console.log("Record Not Found");
      }
      else {
        console.log(patientRecords);
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

  // Gender variable for contract
  if (data.gender == 'male') {
    sex = 0;
  }
  else if (data.gender == 'female') {
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
        console.log(txn);
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
    // console.log("verified donation is", data)
     // web3.eth.getAccounts().then((accounts) => {

      DonationContract.methods
        .getPatient(data.uid, data.patientCount)
        .call({ from: accountAddress, gas: 257685 })
        .then((txn) => {

          PatientData.findOne({ uid: data.uid }, (err, patientRecords) => {
            if (err) {
              console.log(err)
            } else {
              if (!(patientRecords)) {
                res.status(404).send("Record Not Found");
                console.log("Record Not Found");
              }
              else {
                console.log(txn);
                // res.status(200).send(txn);
                res.status(200).render("verifyPatient",{DPD : txn});
                console.log(patientRecords);
                // res.status(200).render('revisit', { pRecord: patientRecords }) .catch(_err => {
                //     res.status(400).send("Unable to Read the Database");
                //    });          
              }
            }
          });
        //   if(!(patientRecords)){
        //     console.log("Not found")
            
        //   }
        //   else{
        //   console.log(txn);
        //   // res.status(200).send(txn);
        //   res.status(200).render("verifyPatient",{DPD : txn});
        // }
      })
    });
  
//   PatientRouter.get('/verify', function (req, res, next) {
    
//     const data = req.body;

//  -    web3.eth.getTransactionCount(accounts[0]).then(txCount => {
//   var patientCount = web3.utils.toHex(txCount)
 

//     // const functionCall = DonationContract.methods.getPatient( data.uid, data.patienCount).calldonationBCTxn.sendTransaction(functionCall, (response) => {
//     //     if (response == true) {console.log("Patient Record is:" +data);
//     //       res.status(200).render('verifyPateint',{pRecord: patientRecord});}else res.send("No such record")'});
//      DonationContract.methods.getPatient( data.uid, data.patientCount)
//      .send({from:accountAddress, gasLimit : "540000"}).then((txn) => {
//        console.log(txn);
//        if (err) {
//          console.log(err); }
//          else{
//         console.log("Patient Record is:" + txn);
//         res.status(200).render('verifyPatient',{VPD : txn});
//          }
//     })
//     });
  

       
/* POST verify patient. */

  // web3.eth.getAccounts().then((accounts) => {
  //   DonationContract.methods
  //     .getPatient(data.uid, data.patientCount)
  //     .call({ from: accounts[0], gas: 257685 })
  //     .then((txn) => {
  //       console.log(txn);
  //       // res.status(200).send(txn);
  //       res.status(200).render("verifyPatient",{VPD : txn});
  //     })
  // })
// });

/* POST Update patient. */
PatientRouter.post('/update', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = PatientRouter;



/* Code Desposal

  PatientData.find({ uid: data.uid },{$sort:{createdOn: -1}}, (err, patientRecords) => {

  const nameB32 = web3.utils.rightPad(web3.utils.fromAscii(data.name), 64); // Name: string is converted to hex and then to bytes32

  res.status(200).send(txn);

  res.status(200).redirect('/revisit',{
    uniqueID: patientRecord.uid,
    name: patientRecord.name,
    age: patientRecord.age,
    gender: patientRecord.gender,
    dob: patientRecord.dateOfBirth.toLocaleDateString(),
    phone: patientRecord.phone,
    address: patientRecord.address,
    recordAdded: patientRecord.recordAdded.toLocaleDateString() + ' ' + patientRecord.recordAdded.toLocaleTimeString()
  });

*/