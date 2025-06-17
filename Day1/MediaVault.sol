// MediVault.sol - Draft for Day 1
pragma solidity ^0.8.0;

contract MediVault {
    struct Record {
        string description;
        string ipfsHash;
        address uploadedBy;
    }

    mapping(address => Record[]) public patientRecords;
    mapping(address => mapping(address => bool)) public access;

    function grantAccess(address doctor) public {
        access[msg.sender][doctor] = true;
    }

    function viewRecord(address patient) public view returns (Record[] memory) {
        require(access[patient][msg.sender], "No Access!");
        return patientRecords[patient];
    }
    function addRecord(string memory description, string memory ipfsHash) public {
    Record memory newRecord = Record(description, ipfsHash, msg.sender);
    patientRecords[msg.sender].push(newRecord);
   }

}
