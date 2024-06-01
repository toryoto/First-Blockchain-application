// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {
  // トークンの名前と単位を渡す
  constructor() ERC20("MyERC20", "ME2") {
    // 作成者にトークンんを渡す
    _mint(msg.sender, 1000000);
  }
}