 var express = require('express');
const donationRouter = express.Router();
const DonationData = require('../model/donationData.js');
//const DonationBCTxn = require("./donationBCTxn");

/* POST Donation details. */
donationRouter.post('/get', function (req, res, next) {
  const data = req.body;
  console.log("Getted donation is:", data)
  DonationData.find({ uid: data.uid }, (err, donationRecord) => {
    if (err) {
      console.log(err)
    } else {
      if (!donationRecord) {
        res.status(404).send("Record Not Found");
      }
      else {
        console.log("Donation is" +donationRecord);
        res.status(200).render('previousDRs', { dRecord: donationRecord })
        .catch(_err => {
          res.status(400).send("Unable to Read the Database");
        });
      }
    }
  });
});

/* POST add Donation. */
donationRouter.post('/add', function (req, res, next) {
  const data = req.body;
  console.log("data is", JSON.stringify(data));
  
  const dData = {
    uid: data.uid,
    name: data.name,
    organ: data.organ,
    hospital: data.hospital,
    doctor: data.doctor,
    slNo: data.slNo
   
  }

  record = new DonationData(dData);
  record.save((err, DonationRecord) => {

    // web3.eth.getAccounts().then((accounts) => {
      DonationContract.methods.setDonationData(data.uid, data.name, data.organ, data.hospital, data.doctor, data.slNo)
        .send({from: accountAddress, gasLimit: "10007000" }).then((txn) => {
          console.log("txn" +JSON.stringify(txn));
          if (err) {
            console.log(err);
          } else {
            console.log("donation record is" +DonationRecord);

            res.status(200).render('donationRecord',{dRecord: DonationRecord})
          //   .catch(_err => {
          //     res.status(400).send("Unable to Read the Database");
          // })
        }
        })
  });


});

/* POST verify Donation */
donationRouter.post('/verify', function (req, res, next) {
  const data = req.body;
  console.log("Verified donation is", data)
  const uid = data.uid;
 
 
    DonationContract.methods.getData(data.uid)
      .call({ from: accountAddress, gas: 907685 })
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
        res.status(200).render("verifyDonation", { DVD: txn })
        // .catch(_err => {
        //   res.status(400).send("Unable to Read the Database");
        // })
          }
         
      }
});
});
})


module.exports = donationRouter;

