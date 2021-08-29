import Head from 'next/head'
import { useEffect, useState } from 'react'
import { requestAccount, mintPunk, getTransaction } from '@/utils/web3'
import toast from 'react-hot-toast';
import Link from 'next/link'
import { useLocalStorage } from 'hooks/use-local-storage';
import { useWeb3 } from 'hooks/use-web-3';

const toastMinted = (id) => toast.success(
  <Link href="/my-punks">
    <a className="text-green-400 text-sm hover:text-green-400 
      hover:underline block">
      Token successfully minted, click here for checking it out!
    </a>
  </Link>, {
  id,
  duration: 10000,
  position: 'bottom-right'
})

export default function Mint() {
  const { provider, source } = useWeb3()
  const [transactionStack, setTransactionStack] = useLocalStorage('pendingTransactions', [])

  useEffect(() => {
    if (provider !== null && Number(provider?.network?.chainId) === Number(process.env.NEXT_PUBLIC_CHAINID)) {
      transactionStack.forEach((transaction) => {
        getTransaction(provider, transaction).then(() => {
          const item = localStorage ? localStorage.getItem('pendingTransactions') : null;
          const transactionStackUpdated = item ? JSON.parse(item) : [];
          setTransactionStack(transactionStackUpdated.filter((txHash) =>
            txHash !== transaction))
          toastMinted(transaction)
        })
      })
    }
  }, [source])


  const [isLoading, setIsLoading] = useState<string | null>(null)

  async function mintToken() {
    if (provider !== null
      && Number(provider?.network?.chainId) === Number(process.env.NEXT_PUBLIC_CHAINID)) {
      try {
        setIsLoading('Minting, check the request on your wallet...')
        const transaction = await mintPunk(provider)
        setTransactionStack([transaction.hash, ...transactionStack])
        setIsLoading('Your token is being minted, please wait!')
        await transaction.wait()
        toastMinted(transaction.hash)
        setTransactionStack(transactionStack.filter((transaction) => transaction !== transaction.hash))
        setIsLoading(null)
      } catch (error: any) {
        if (error.code !== 4001) {
          toast.error(error.code)
        }
        setIsLoading(null)
      }
    } else {
      toast.error(`Invalid network, please switch back to ${Number(process.env.NEXT_PUBLIC_CHAINID) === 1 ? 'mainnet' : 'testnet'}`, {
        duration: 10000,
        position: 'bottom-right'
      })
    }
  }

  return (
    <div className="h-full flex flex-col justify-center py-2">
      <Head>
        <title>SNES Punks - Mint</title>
      </Head>

      <div className="flex flex-col items-center space-y-16 px-20 text-center font-bold text-white">
        <img
          className={isLoading ? 'cursor-auto' : 'cursor-pointer'}
          onClick={isLoading ? () => null : mintToken}
          src={isLoading ? '/eth.gif' : '/eth.png'}
          width={160}
          alt="ETH Loading" />
        {isLoading ?
          <span>{isLoading}</span> :
          <div className="flex flex-col space-y-5">
            <button
              onClick={mintToken}
              className="hover:text-gray-200">
              Mint SNES Punk (0.02 ETH)
            </button>
          </div>}

        {transactionStack.map((transaction) =>
          <a
            key={transaction}
            href={`${process.env.NEXT_PUBLIC_ETHERSCAN_BASE_URL}${transaction}`}
            target="_blank" 
            rel="noreferrer" className="text-blue-300 text-sm hover:text-blue-300 
              hover:underline block">
            [PENDING TRANSACTION] Click here for details!
          </a>
        )}
      </div>
    </div >
  )
}
