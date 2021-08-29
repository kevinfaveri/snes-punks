import { requestAccount, switchEthereumChain } from "@/utils/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Ethereumish } from "additional";
import { ethers } from 'ethers';
import React, { Consumer, createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from "./use-local-storage";

interface Web3Info {
  provider: ethers.providers.Web3Provider | null,
  source: WalletConnectProvider | Ethereumish | any | null
}

interface TypeState {
  type: string | null,
  setType: React.Dispatch<React.SetStateAction<string | null>>
}

interface WalletContextProvider {
  Provider: React.FC<any>,
  Consumer: Consumer<TypeState>
}

const WALLET_PROVIDER_VALUES = {
  wallet_connect: process.env.NEXT_PUBLIC_INFURAID,
  injected: process.browser && window?.ethereum,
}

export const Web3Context: WalletContextProvider = createContext<TypeState>({
  type: null,
  setType: () => null
})

const getWeb3: (type: string | null) => Promise<Web3Info | null> = (type) => {
  return new Promise(async (resolve, reject) => {
    if (type === 'wallet_connect') {
      const providerValue = WALLET_PROVIDER_VALUES[type]
      const source = new WalletConnectProvider({
        infuraId: providerValue,
        qrcode: true
      });
      console.log('enabling')
      try {
        await source.enable()
      } catch (error) {
        reject('You have closed the modal so we could not connect to your wallet!')
        return
      }
      console.log('ENABLED')
      await switchEthereumChain(source)
      await requestAccount(source)
      const ethersProvider = new ethers.providers.Web3Provider(source);
      resolve({ provider: ethersProvider, source })
    } else if (type === 'injected') {
      const providerValue = WALLET_PROVIDER_VALUES[type]
      await switchEthereumChain(providerValue)
      await requestAccount(providerValue).catch(() => {
        reject('User rejected the app connection request!')
        return
      })
      const ethersProvider = new ethers.providers.Web3Provider(providerValue as any);
      resolve({ provider: ethersProvider, source: providerValue })
    } else {
      reject('Wallet type not supported!')
    }
  });
};

export function WalletProvider({ initialType, children }) {
  const [type, setType] = useLocalStorage('wallet_type', initialType);
  const [error, setError] = useState<string | null>(null);

  return <Web3Context.Provider
    initialType={null}
    value={{
      typeManager: { type, setType },
      errorManager: { error, setError }
    }}>
    {children}
  </Web3Context.Provider>;
}

export function useWalletManager(): any {
  const { typeManager, errorManager } = useContext(Web3Context as any);
  return { typeManager, errorManager };
}

export function useWeb3() {
  const { typeManager, errorManager } = useWalletManager()
  const [web3Info, setWeb3Info] = useState<Web3Info>({
    provider: null,
    source: null
  });

  useEffect(() => {
    if (typeManager.type) {
      getWeb3(typeManager.type).then(web3InfoFromProvider => {
        setWeb3Info({ ...web3Info, ...web3InfoFromProvider });
      }).catch((error) => {
        typeManager.setType(null)
        errorManager.setError(error)
      }
      );
    }
  }, [typeManager.type]);

  return web3Info;
}