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
        qrcode: true,
        chainId: Number(process.env.NEXT_PUBLIC_CHAINID),
        rpc: {
          1: "https://mainnet.infura.io/v3/055a0d947f5042e4bc5f3ce8d588b8ee",
          4: "https://rinkeby.infura.io/v3/055a0d947f5042e4bc5f3ce8d588b8ee",
        }
      });
      try {
        await source.enable()
      } catch (error) {
        reject('You have closed the modal so we could not connect to your wallet!')
        return
      }
      const ethersProvider = new ethers.providers.Web3Provider(source);
      if (source.chainId !== Number(process.env.NEXT_PUBLIC_CHAINID)) {
        source.qrcodeModal.close()
        await source.disconnect()
        reject('You have added an account from a wrong network, please try again!')
      } else {
        source.qrcodeModal.close()
        resolve({ provider: ethersProvider, source })
      }
    } else if (type === 'injected') {
      const providerValue = WALLET_PROVIDER_VALUES[type]
      await switchEthereumChain(providerValue)
      await requestAccount(providerValue).catch((error: any) => {
        if (error.code !== -32002) {
          reject('User rejected the app connection request!')
          return
        }
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
        errorManager.setError(null)
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