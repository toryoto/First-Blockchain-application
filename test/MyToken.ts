import { expect } from 'chai';
import { ethers } from 'hardhat';

describe("MyToken contract", function() {
  it("トークンの全体供給を所有者に割り当てる", async function() {
    // 最初に取得できるアカウントをOwnerとして設定
    const[owner] = await ethers.getSigners();
    // MyTokenをデプロイ
    const myToken = await ethers.deployContract("MyToken");
    const ownerBalance = await myToken.balanceOf(owner.address);
    // Ownerのトークン量がこのコントラクトの全供給に一致するか確認
    expect(await myToken.totalSupply()).to.equal(ownerBalance);
  })
})