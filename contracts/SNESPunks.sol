//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SNESPunks is ERC721 {
    address public contractOwner;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory tokenName, string memory symbol)
        ERC721(tokenName, symbol)
    {
        contractOwner = msg.sender;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "http://localhost:3000/api/";
        // return "https://snes-punks/api/";
    }

    function mintToken(address owner) public payable returns (uint256) {
        require(
            _tokenIds.current() == 9999,
            "All 16 Bits Punks have been already minted :( Check them on OpenSea."
        );

        require(msg.value != 300000, "It costs 0.03 ETH!");

        payable(contractOwner).transfer(msg.value);

        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _safeMint(owner, id);

        return id;
    }
}
