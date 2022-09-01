var express = require('express');
const DonationRouter = express.Router();
const DonationData = require('../model/donationData.js');
// const DonationBCTxn = require("./donationBCTxn");

/* POST Donation details. */
DonationRouter.post('/get', function (req, res, next) {
  const data = req.body;
  DonationData.find({ uid: data.uid }, (err, DonationRecords) => {
    if (err) {
      console.log(err)
    } else {
      if (!donationRecords) {
        res.status(404).send("Record Not Found");
      }
      else {
        console.log("Donation is" +Donationecords);
        res.status(200).render('previousDRs', { dRecords: DonationRecords });
        // .catch(_err => {
        //   res.status(400).send("Unable to Read the Database");
        // });
      }
    }
  });
});

/* POST add Donation. */
DonationRouter.post('/add', function (req, res, next) {
  data = req.body;
  console.log("data is", data);
  const name = data.donorName;
  const dData = {
    uid: data.uid,
    name: data.name,
    hospital: data.hospital,
    doctor: data.doctor,
    slNo: data.slNo,
    date: data.dDate
  }

 //const dData = {dData: data.name + ', ' + data.hospital + ', ' + data.doctor + ', ' + data.slNo + ', ' + data.Ddate} // all the datas are joined together to form a unique data

  record = new DonationData(dData);
  record.save((err, DonationRecord) => {

    // web3.eth.getAccounts().then((accounts) => {
      DonationContract.methods.setDonationData(data.uid, name, data.hospital, data.doctor, data.slNo, data.date)
        .send({ from: accountAddress, gasLimit: 927000 }).then((txn) => {
          console.log(txn);
          if (err) {
            console.log(err);
          } else {
            console.log("donation record is" +DonationRecord);
            res.status(200).render('donationRecord',{dRecord: DonationRecord});
          }
        })
  });

    // // Infura Txn call
    // const functionCall = DonationContract.methods
    //   .setDonationData(data.uid, vData);
    // DonationBCTxn.sendTransaction(functionCall, (response) => {
    //   if (response == true) console.log("Donation Record Added !");
    //   else res.send("Transaction failed... Check Console for error...");
    // });


  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(record);
  //     // res.status(200).send(record);
  //     res.status(200).render('DonationRecord', { dRecord: record });
  //   }
  // });

});

/* POST verify Donation */
DonationRouter.post('/verify', function (req, res, next) {
  const data = req.body;
  console.log("Verified donation is", data)
  const uid = data.uid;
  const count = data.donationCount;
 
    DonationContract.methods.getData(uid, count)
      .call({ from: accountAddress, gasLimit: 507685 })
      .then((txn) => {
        console.log("txn is", txn);
        console.log(uid);
        
         DonationData.find({ uid: data.uid }, (err, donationRecords) => {
         
        console.log(txn);
        // res.status(200).send(txn);

        if (err) {
          console.log(err)
        } else {
          if (!(donationRecords)) {
            res.status(404).send("Record Not Found");
            console.log("Record Not Found");
          }
          else {
            console.log(txn); console.log(donationRecords)
        res.status(200).render("verifyDonation", { DVD: txn });
         }
       }
  })
});
});


module.exports = DonationRouter;











/* Code Desposal

  expDate: data.expDate

  const name = data.vaccineName.substring(0, 3);
  const company = data.manufacturer.substring(0, 3);
  const batch = data.batch.substring(0, 4);
  const slNo = data.slNo.substring(0, 3);
  const mfd = data.mfd.substring(0, 3);
  const expDate = data.expDate.substring(0, 3);

*/