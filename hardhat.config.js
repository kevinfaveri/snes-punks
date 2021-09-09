require('dotenv').config({ path: './.env.local' })

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './artifacts',
  },
  etherscan: {
    apiKey: process.env.ETHSCAN_API_KEY_TOKEN
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/055a0d947f5042e4bc5f3ce8d588b8ee",
      accounts: [`0x${process.env.CONTRACT_OWNER_PK}`]
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/055a0d947f5042e4bc5f3ce8d588b8ee",
      accounts: [`0x${process.env.CONTRACT_OWNER_PK}`]
    }
  }
};
