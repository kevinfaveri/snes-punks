//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Punks16BitsMinter is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory tokenName, string memory symbol)
        ERC721(tokenName, symbol)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "http://localhost:3000/api/";
        // return "https://snes-punks/api/";
    }

    function mintToken(address owner) public returns (uint256) {
        require(
            _tokenIds.current() == 9999,
            "All SNES Punks have been already minted :( Check them on OpenSea."
        );

        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _safeMint(owner, id);

        return id;
    }
}
