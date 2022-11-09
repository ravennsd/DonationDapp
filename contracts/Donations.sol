

// SPDX-License-Identifier: GPL-3.0
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
    mapping(uint256 => patientData) private pData;
    // Iterable variable declaration for patient data count
    

    //function to set patient data
    function setPatient(
        uint256 _uid,
        string memory _name,
        uint256 _age,
        Sex _gender,
        string memory _location
    ) 
      public 
    {      
      pData[_uid] = patientData (
          _uid, 
          _name, 
          _age, 
          _gender,
          _location
      );
    
    }
    // function to retrieve data of patient from blockchain
    function getPatient(uint256 _uid)
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
            pData[_uid].uid,
            pData[_uid].name,
            pData[_uid].age,
            pData[_uid].gender,
            pData[_uid].location
        );
    }


  struct donationData {
        uint256 uid;
        string name;
        string organ;
        string hospital;
       
        string doctor;
        string slNo;
        
    }
    //mapping to retrieve Donation data stored in the blockchian
    mapping(uint256 => donationData) private dData;
 

    //function to set Donaiton data
   
    function setDonationData(
        uint256 _uid,
        string memory _name,
        
        string memory _organ,
        string memory _hospital,
        string memory _doctor,
        string memory _slNo
        
    ) public {
       
        dData[_uid] = donationData(
            _uid,
            _name,
            _organ,
            _hospital,
            _doctor,
            _slNo
        );
    }
    // function to retrieve Donation data from blockchain
   
        function getData(uint256 _uid)
        public
        view
        returns (uint256, string memory, string memory, string memory, string memory, string memory)
    {
        // return donationData[_uid][_donationCount];
         return (
            dData[_uid].uid,
            dData[_uid].name,
            dData[_uid].organ,
            dData[_uid].hospital,
           
            dData[_uid].doctor,
            dData[_uid].slNo
        );
    }
    
}