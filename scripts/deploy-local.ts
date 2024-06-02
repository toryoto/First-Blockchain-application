import { ethers } from "hardhat";

async function main() {
  const myERC20 = await ethers.deployContract("MyERC20");
  myERC20.waitForDeployment();
  console.log(`My Token deployed to: ${myERC20.target}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});