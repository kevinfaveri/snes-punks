//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract SNESPunks is ERC721, ERC721Enumerable {
    address public contractOwner;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "http://localhost:3000/api/";
        // return "https://snes-punks/api/";
    }

    constructor(string memory tokenName, string memory symbol)
        ERC721(tokenName, symbol)
    {
        contractOwner = msg.sender;
    }

    function mintToken() public payable returns (uint256) {
        require(
            _tokenIds.current() < 10,
            "All 16 Bits Punks have been already minted :( Check them on OpenSea."
        );

        require(msg.value == 0.03 * (10**18), "The Punks costs 0.03 ETH!");

        payable(contractOwner).transfer(msg.value);

        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _safeMint(msg.sender, id);

        return id;
    }
}
