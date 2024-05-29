// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

/**
 * @title SepoliaGenie
 * @author Preet Singh
 * @dev Contract for distributing Sepolia Eth
 */

contract SepoliaGenie {
    // Global variables
    uint256 public constant minvalue = 0.05 ether;
    address[] private donors;

    constructor() payable {
        require(msg.value >= 3 ether, "Please provide minimum 3 Ether");
    }

    function claim(address payable Address) public payable {
        require(
            address(this).balance >= minvalue,
            "Contract balance insufficient"
        );
        Address.transfer(minvalue);
    }

    function donation() public payable {
        require(msg.value >= minvalue, "Please give minimum 0.05 Sepolia Eth");
        donors.push(msg.sender);
    }

    function allDonors() public view returns (address[] memory) {
        return donors;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
