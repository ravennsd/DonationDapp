// SPDX-License-Identifier: GPL-3.0

 //contract without count update
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donation {
    //enum for gender
    enum Sex {male, female, other}

    // struct for saving the data of patient
    struct patientData {
        uint256 uid;
        string name;
        uint256 age;
        Sex gender;
        string location;
    }

    //mapping to retrieve patient data stored in the blockchian
    mapping(uint256 => mapping(uint256 => patientData)) private pData;
    // Iterable variable declaration for patient data count
    mapping(uint256 => uint256) patientCount;

    //function to set patient data
    function setPatient(
        uint256 _uid,
        string memory _name,
        uint256 _age,
        Sex _gender,
        string memory _location
    ) public {
        patientCount[_uid] += 1;
        pData[_uid][patientCount[_uid]] = patientData(
            _uid,
            _name,
            _age,
            _gender,
            _location
        );
    }

    // function to retrieve data of patient from blockchain
    function getPatient(uint256 _uid, uint256 _patientCount)
        public
        view
        returns (
            uint256,
            string memory,
            uint256,
            Sex,
            string memory
        )
    {
        return (
            pData[_uid][_patientCount].uid,
            pData[_uid][_patientCount].name,
            pData[_uid][_patientCount].age,
            pData[_uid][_patientCount].gender,
            pData[_uid][_patientCount].location
        );
    }

    //mapping to retrieve Donation data stored in the blockchian
    mapping(uint256 => mapping(uint256 => string)) private donationData;
    // Iterable variable declaration for Donation data count
    mapping(uint256 => uint256) donationCount;

    //function to set Donaiton data
    function setDonationData(uint256 _uid, string memory _donationData) public {
        donationCount[_uid] += 1;
        donationData[_uid][donationCount[_uid]] = _donationData;
    }

    // function to retrieve Donation data from blockchain
    function getData(uint256 _uid, uint256 _donationCount)
        public
        view
        returns (string memory)
    {
        return donationData[_uid][_donationCount];
    }
}

//contract with update count

// pragma solidity >=0.4.22 <0.9.0;

// contract Donation {
//     //enum for gender
//     enum Sex {male, female, other}

//     // struct for saving the data of patient
//     struct patientData {
//         uint256 uid;
//         string name;
//         uint256 age;
//         Sex gender;
//         string location;
//     }

//     //mapping to retrieve patient data stored in the blockchian
//     mapping(uint256 => mapping(uint256 => patientData)) private pData;
//     // Iterable variable declaration for patient data count
//     mapping(uint256 => uint256) patientCount;

//     //function to set patient data
//     function setPatient(
//         uint256 _uid,
//         string memory _name,
//         uint256 _age,
//         Sex _gender,
//         string memory _location
//     ) public {
//         patientCount[_uid] += 1;
//         pData[_uid][patientCount[_uid]] = patientData(
//             _uid,
//             _name,
//             _age,
//             _gender,
//             _location
//         );
//     }

//     // function to retrieve data of patient from blockchain
//     function getPatient(uint256 _uid, uint256 _patientCount)
//         public
//         view
//         returns (
//             uint256,
//             string memory,
//             uint256,
//             Sex,
//             string memory
//         )
//     {
//         return (
//             pData[_uid][_patientCount].uid,
//             pData[_uid][_patientCount].name,
//             pData[_uid][_patientCount].age,
//             pData[_uid][_patientCount].gender,
//             pData[_uid][_patientCount].location
//         );
//     }


//   struct donationData {
//         uint256 uid;
//         string name;
//         string hospital;
//         string organ;
//         string doctor;
//         uint256 slNo;
//         string date;
//     }
//     //mapping to retrieve Donation data stored in the blockchian
//     mapping(uint256 => mapping(uint256 => donationData)) private dData;
//     // Iterable variable declaration for Donation data count
//     mapping(uint256 => uint256) donationCount;

//     //function to set Donaiton data
//     // function setDonationData(uint256 _uid, string memory _donationData) public {
//     //     donationCount[_uid] += 1;
//     //     donationData[_uid][donationCount[_uid]] = _donationData;
//     // }  
//     function setDonationData(
//         uint256 _uid,
//         string memory _name,
//         string memory _hospital,
//         string memory _organ,
//         string memory _doctor,
//         uint256 _slNo,
//         string memory _date
//     ) public {
//         // donationCount[_uid] += 1;
//         // dData[_uid][donationCount[_uid]] = donationData(
//         dData[_uid][donationCount[_uid]] = donationData(
//             _uid,
//             _name,
//             _hospital,
//             _organ,
//             _doctor,
//             _slNo,
//             _date
//         );
//     }
//     // function to retrieve Donation data from blockchain
//     // function getData(uint256 _uid, uint256 _donationCount)
//     //     public
//     //     view
//     //     returns (string memory)
//          function getData(uint256 _uid, uint256 _donationCount)
//         public
//         view
//         returns (uint256, string memory, string memory, string memory, string memory, uint256)
//     {
//         // return donationData[_uid][_donationCount];
//          return (
//             dData[_uid][_donationCount].uid,
//             dData[_uid][_donationCount].name,
//             dData[_uid][_donationCount].hospital,
//             dData[_uid][_donationCount].organ,
//             dData[_uid][_donationCount].doctor,
//             dData[_uid][_donationCount].slNo
//             // dData[_uid][_donationCount].date
//         );
//     }
    
// }