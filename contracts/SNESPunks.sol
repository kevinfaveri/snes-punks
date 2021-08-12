//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SNESPunks is ERC721, ERC721Enumerable, Ownable {
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
        return "https://snespunks.com/api/punks/";
    }

    constructor(string memory tokenName, string memory symbol)
        ERC721(tokenName, symbol)
    {
        contractOwner = msg.sender;
    }

    function mintToken() public payable returns (uint256) {
        uint256 id = _tokenIds.current();

        require(
            id < 9999,
            "All SNES 16-Bits Punks have been already minted :( Check them on OpenSea."
        );

        require(
            msg.value == 0.02 * (10**18),
            "The SNES Punks costs 0.02 ETH each!"
        );

        payable(contractOwner).transfer(msg.value);

        _safeMint(msg.sender, id);
        _tokenIds.increment();

        return id;
    }
}
