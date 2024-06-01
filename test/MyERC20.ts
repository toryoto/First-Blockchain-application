import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyERC20 contract", function () {
  it("トークンの全供給量を所有者に割り当てる", async function () {
    const [owner] = await ethers.getSigners();
    const myERC20= await ethers.deployContract("MyToken");
    const ownerBalance = await myERC20.balanceOf(owner.address);
    // Ownerのトークン量がこのコントラクトの全供給量に一致するか確認
    expect(await myERC20.totalSupply()).to.equal(ownerBalance);
  });
});