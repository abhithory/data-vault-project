// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract DataVault {
    enum DataType{
        CREDENTIALS,
        FILE,
        INFO,
        OTHER
    }

    struct DataStruct {
        DataType dataType;
        string dataName;
        string dataHash;
        string decryptKey;
        uint256 uploadTime;
    }

    mapping(address => DataStruct[]) private _allDataOfUser;
    event DataAdded(DataType indexed dataType,address indexed user, string fileHash,string decryptKey,uint256 uploadTime);


    function addData(DataStruct memory _data) external{
        _data.uploadTime = block.timestamp;
        _allDataOfUser[msg.sender].push(_data);
    }
    function userAllDataCount() public view returns (uint256) {
        return _allDataOfUser[msg.sender].length;
    }

    function getAllData()
        external
        view
        returns (DataStruct[] memory allData)
    {
        uint256 totalData = userAllDataCount();
        allData = new DataStruct[](totalData);
        for (uint i = 0; i < totalData; i++) {
            allData[i] = _allDataOfUser[msg.sender][i];
        }
    }

    function userSpecifcDataCount(DataType _dataType) public view returns (uint256) {
        uint256 totalData = userAllDataCount();
        uint256 _specificDataCount = 0;
        for (uint i = 0; i < totalData; i++) {
            if(_allDataOfUser[msg.sender][i].dataType == _dataType){
             _specificDataCount++;   
            }
        }
        return _specificDataCount;
    }

}
