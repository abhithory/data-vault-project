// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// import "hardhat/console.sol";

contract DataVault {
    // structure of file data
    struct FileStruct {
        bool advanceEncryptionStatus;
        string fileName;
        string fileHash;
        string decryptKey;
    }

    // structure of Credential data
    struct CredentialStruct {
        string website;
        string usernameOrEmailOrPhone;
        string password;
    }

    // event FileAddedByUser(string name,address indexed user);
    // event CredentialAddedByUser(string name,address indexed user);

    // mapping of all files of user
    mapping(address => FileStruct[]) private _allFilesOfUser; // addressOfUser => files[]

    //  mapping of all credentials of user
    mapping(address => CredentialStruct[]) private _allCredentialsOfUser; //addressOfUser => credentials[]

    // add data of file of user
    function addFileOfUser(FileStruct memory _fileData) external {
        _allFilesOfUser[msg.sender].push(_fileData);
    }

    // add credential of user
    function addCredentialOfUser(
        CredentialStruct memory _credentialData
    ) external {
        _allCredentialsOfUser[msg.sender].push(_credentialData);
    }

    // get total files count that user added
    function userTotalFilesCount() internal view returns (uint256) {
        return _allFilesOfUser[msg.sender].length;
    }

    // get total credentials count that user added
    function userTotalCredentialCount() internal view returns (uint256) {
        return _allCredentialsOfUser[msg.sender].length;
    }

    function getAllFilesOfUser()
        external
        view
        returns (FileStruct[] memory allFiles)
    {
        uint256 totalFiles = userTotalFilesCount();
        allFiles = new FileStruct[](totalFiles);
        for (uint i = 0; i < totalFiles; i++) {
            allFiles[i] = _allFilesOfUser[msg.sender][i];
        }
    }

    function getAllCredentialsOfUser()
        external
        view
        returns (CredentialStruct[] memory allCreds)
    {
        uint256 totalCredentials = userTotalCredentialCount();
        allCreds = new CredentialStruct[](totalCredentials);
        for (uint i = 0; i < totalCredentials; i++) {
            allCreds[i] = _allCredentialsOfUser[msg.sender][i];
        }
    }
}
