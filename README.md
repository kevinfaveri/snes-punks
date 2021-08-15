# SNESPunks

This is an example fullstack ethereum app using NextJS + Tailwind + nes.css as front/back techstack. It is integrated with Metamask for supporting web3 in the frontend; The contract has been written and deployed using HardHat and the ERC712, ERC721Enumerable, Ownable and Counters OpenZeppelin interfaces. Ownable is used so OpenSea can get access to the getOwner function but it could have been implemented too if you do not wish to extends on the interface.

## Env Vars

You need to have these environment variables defined for the project to work:
- DATABASE_CONNECTION_STRING
- SPACES_API_KEY
- SPACES_SECRET_KEY
- CONTRACT_OWNER_PK

## Support the project

If you wish to support the project, mint one exclusive SNESPunk here: https://snespunks.com/

My plan is to work on even more elaborated blockchain fullstack apps as I study new things, always focusing on an example real world app! If you wish to support that, mint one NFT :)

## Roadmap

- Tests for contract
- SNESPunks Twitter bot integrated with OpenSea + Infura API
- Gamification in the main website using the tokens


### Suggestions for improvements for this repo

I chose to go simply in this one with a sequential minting so all business rule is on the contract! But a simpler solution if you want to randomize, or even generate things on the fly (like, they don't use a similar artwork [in this case CryptoPunks] as a base), you can always use Ethereum APIs, be it etherscan, Infura or Alchemy (or any other provider of nodes that gives you APIs to play with) for listening for transactions and minting random NFT's. Another option might be to integrate with something like Chainlink Oracles for dynamic NFT's.
