import { ethers } from "hardhat";

async function main() {


  const datavault = await ethers.deployContract("DataVault");

  await datavault.waitForDeployment();

  console.log(
    `Deployed: ${datavault.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
