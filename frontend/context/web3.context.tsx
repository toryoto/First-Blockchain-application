'use client';
import { Signer } from "ethers";
import React, { Dispatch, createContext, useState } from "react";

// アプリケーション全体のステートとして、MetaMaskのプロバイダー情報を保持する
// どのコンポーネントでもこのステートにアクセスできる
// Signerの状態が変更されたとき（例：ユーザーがMetaMaskで別のアカウントに切り替えたとき）、この変更をアプリケーション全体に反映させることができる
export const Web3SignerContext = createContext<
  {
    signer: Signer | null;
    // signerを更新する関数
    // Dipatchは型がSignerを保証する
    setSigner: Dispatch<Signer>;
  }
>({
  signer: null,
  setSigner: () => { }
});


// アプリケーションの各ページ、コンポーネントにステートへのアクセスを提供する
// React.ReactNodeはReactで子要素として許可されるすべての型を包含する型
export const Web3SignerContextProvider = ({children}: {children: React.ReactNode}) => {
  const [signer, setSigner] = useState<Signer | null>(null);
  return (
    // 子コンポーネントがMetamaskのアカウント管理を参照できるようにする
    <Web3SignerContext.Provider value={{ signer, setSigner }}>
      {children}
    </Web3SignerContext.Provider>
  );
};