"use client";
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import artifact from "../abi/MyToken.sol/MyToken.json";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export default function Home() {
  // Metamask等が提供するEthereumプロバイダーを格納する変数
  const [windowEthereum, setWindowEthereum] = useState<any>(null);
  // MyTokenの所有数を格納する変数
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // イーサリウムプロバイダーを取得し、変数に代入
    const { ethereum } = window as any;
    if (ethereum) {
      setWindowEthereum(ethereum);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  }, []);

  const handleButtonClick = async () => {
    if (windowEthereum) {
      const provider = new ethers.BrowserProvider(windowEthereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        artifact.abi,
        signer
      );
      const walletAddress: string = await signer.getAddress();
      console.log("Wallet Address:", walletAddress);
      const balance = await contract.balanceOf(walletAddress);
      console.log("Balance:", balance.toString());
      setInputValue(balance.toString());
    }
  };

  return (
    <div>
      <h1>Blockchain sample app</h1>
      <button onClick={handleButtonClick}>Tokens owned</button>
      <input type="text" value={inputValue} readOnly />
    </div>
  );
}
