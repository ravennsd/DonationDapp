const Donation = artifacts.require("Donation");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Donation", function (/* accounts */) {
  it("should assert true", async function () {
    await Donation.deployed();
    return assert.isTrue(true);
  });

  /* Pateint functions testing */
  it('Add patient Details', async function () {
    const patient = await Donation.deployed();

    /* Test data declaration */
    uid = 1011;
    name1 = "This is a test";
    age = 12;
    gender = 0;
    location = "SandBox, Kerala , IND";
    patientCount = 1;

    await patient.setPatient(uid, name1, age, gender, location); //setPatient method for adding patient details to blockchain
    patientDeatails = await patient.getPatient(uid, patientCount); //getPatient method for getting data from the blockchain
    assert.equal(patientDeatails[0], uid, "Test fail"); //Unique ID testing
    assert.equal(patientDeatails[1], name1, "Test fail"); //Patient name testing
    assert.equal(patientDeatails[2], age, "Test fail"); //Patinet age testing
    assert.equal(patientDeatails[3], gender, "Test fail"); //Patient gender data testing
    assert.equal(patientDeatails[4], location, "Test fail");//loaction data testing
  });

  /* Donation Functions testing */
  it('Add Donation Details', async function () {
    const Donation = await Donation.deployed();

    /* Test data declaration */
    uid = 1011;
    donationData = "This is a test";
    donationCount = 1;

    await Donation.setDonationData(uid, donationData); //setDonationData method for adding Donation data to blockchain
    donationDetails = await Donation.getData(uid, donationCount); //getData method for getting data from the blockchain
    assert.equal(patientDeatails[0], uid, "Test fail"); //Unique ID testing
    assert.equal(patientDeatails[1], donationData, "Test fail"); //Donation data testing
  });

});
