// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // NFTにメタ情報格納先URIを返却する機能を提供する
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; // 所有者ごとのtokenIdを返却する機能を提供する

contract MyERC721 is ERC721URIStorage, ERC721Enumerable, AccessControl {
  uint256 private _tokenIdCounter;
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");


  /**
   * @dev 継承したOpenZeppelin ERC721.solのコンストラクタが呼び出される。
   * その後コントラクトをデプロイしたアカウントにMINTER_ROLEを付与しNFT作成ができるようにする
   * _nameはこのNFTの名前を示し、_symbolはこのNFTのトークンとしてのシンボルを示す。
   * 例えば、このNFTを保有している場合 1<シンボル名>といった表記となることが一般的
   */
  constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol) {
      _grantRole(MINTER_ROLE, _msgSender());
      _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
  }

  /**
   * @dev このNFTを作成する関数
   * 呼び出しがされると、toに格納されたアドレスが作成されたNFTの保有者となる
   * _tokenURIには、作成するNFTのmetadataが示されるjsonファイルのURIを格納する
   * 前提条件:
   * - _to: NFTが受け取り可能である、つまり有効なアドレスであること(OpenZeppelin ERC721の実装によりチェックされる)
   */
  function safeMint(address to, string memory _tokenURI) public onlyRole(MINTER_ROLE) returns (uint256) {
    uint256 tokenId = _tokenIdCounter;
    _tokenIdCounter += 1;
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, _tokenURI);
    return tokenId;
  }

  // NFTのmetadataを示すjsonファイルのURIを返却する。オーバーライドが求められるが、今回はERC721URIStorageの標準実装のままとするため継承元呼び出しのみとなる
  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  // OpenZeppelin ERC721で提供される、NFT作成やtarnsferのときに呼び出されるフック（トークンの転送に対してのカスタムロジック）
  function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  // NFTをburnするための関数。ERC721URIStorageによりオーバーライドが強制される
  // 今回はburn機能は外部提供しないため、継承元呼び出しとする
  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  // ERC165標準に従って、特定のインターフェイスがサポートされているかどうかを確認するために使用される
  function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControl, ERC721Enumerable,ERC721URIStorage) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}