var express = require('express');
const DonationRouter = express.Router();
const DonationData = require('../model/donationData');
const DonationBCTxn = require("./donationBCTxn");

/* POST Donation details. */
DonationRouter.post('/get', function (req, res, next) {
  const data = req.body;
  DonationData.find({ uid: data.uid }, (err, DonationRecords) => {
    if (err) {
      console.log(err)
    } else {
      if (!DonationRecords) {
        res.status(404).send("Record Not Found");
      }
      else {
        console.log(Donationecords);
        res.status(200).render('previousVRs', { vRecords: DonationRecords });
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
  console.log(data);
  const recordData = {
    uid: data.uid,
    donationName: data.donationName,
    manufacturer: data.manufacturer,
    batch: data.batch,
    slNo: data.slNo,
    mfd: data.mfd
  }

  const dData = data.donationName + '-' + data.hospital + '-' + data.doctor + '-' + data.slNo + '-' + data.date; // all the datas are joined together to form a unique data

  record = new Donationata(recordData);
  record.save((err, record) => {

    web3.eth.getAccounts().then((accounts) => {
      DonationContract.methods
        .setDonationData(data.uid, dData)
        .send({ from: accounts[0], gas: 257685 })
        .then((txn) => {
          console.log(txn);
        })
    })

    // // Infura Txn call
    // const functionCall = DonationContract.methods
    //   .setDonationData(data.uid, vData);
    // DonationBCTxn.sendTransaction(functionCall, (response) => {
    //   if (response == true) console.log("Donation Record Added !");
    //   else res.send("Transaction failed... Check Console for error...");
    // });


    if (err) {
      console.log(err);
    } else {
      console.log(record);
      // res.status(200).send(record);
      res.status(200).render('DonationRecord', { dRecord: record });
    }
  });

});

/* POST verify Donation */
DonationRouter.post('/verify', function (req, res, next) {
  const data = req.body;
  const uid = data.uid;
  const count = data.donationCount;
  web3.eth.getAccounts().then((accounts) => {
    DonationContract.methods
      .getData(uid, count)
      .call({ from: accounts[0], gas: 257685 })
      .then((txn) => {
        // res.status(200).send(txn);
        res.status(200).render("verifyDonation", { VVD: txn });
      })
  })
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