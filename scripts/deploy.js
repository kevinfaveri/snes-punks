const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const NFTMinter = await hre.ethers.getContractFactory("SNESPunks");
  const nftMinter = await NFTMinter.deploy("SNES Punks", "SNESP");
  await nftMinter.deployed();

  console.log("SNESPunks deployed to:", nftMinter.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });