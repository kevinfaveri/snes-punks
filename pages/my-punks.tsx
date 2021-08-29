import PunkCard from '@/components/punk-card';
import { getBalance } from '@/utils/web3';
import toast from 'react-hot-toast';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import useInterval from 'hooks/use-interval';
import { useWeb3 } from 'hooks/use-web-3';

const getTokenIds = (setTokenIds, { provider, source }) => {
  const chainId = provider?._network?.chainId || source.chainId
  if (provider !== null
    && Number(chainId) === Number(process.env.NEXT_PUBLIC_CHAINID)) {
    console.info('GETTING BALANCE...')
    getBalance(provider).then((balanceTokenIds) => {
      setTokenIds(balanceTokenIds)
    })
  } else {
    toast.error(`Invalid network, please switch back to ${Number(process.env.NEXT_PUBLIC_CHAINID) === 1 ? 'mainnet' : 'testnet'}`, {
      duration: 10000,
      position: 'bottom-right'
    })
  }
}
const MyPunks: React.FC = () => {
  const web3Info = useWeb3()
  const [tokenIds, setTokenIds] = useState<number[] | null>(null)
  const { data } = useSWR(tokenIds?.length ? `/api/punks?${tokenIds.map((id) => `ids=${id}&`).join('')}` : null)
  const punks = data?.data || []

  useEffect(() => {
    if (web3Info.source) getTokenIds(setTokenIds, web3Info)
  }, [web3Info])

  useInterval(() => {
    getTokenIds(setTokenIds, web3Info)
  }, 15000)

  return <>
    <Head>
      <title>SNES Punks - My Punks</title>
    </Head>
    <div className="flex flex-wrap justify-center space-x-5">
      {punks.length > 0 && tokenIds?.map((_, index) => {
        const punk: any = punks[index]
        return <div key={punk.id} className="flex flex-col items-center justify-center">
          <PunkCard
            {...punk}
            shareMessage={`Just got my SNES Punk #${punk.id + 1}!`} />
        </div>
      })}

    </div>
    {
      tokenIds === null &&
      <div className="text-white font-bold text-sm mt-5 text-center animate-pulse">
        Loading punks...
      </div>
    }

    {
      punks.length === 0 && tokenIds?.length === 0 &&
      <div className="text-white font-bold text-sm mt-5 pl-2 text-center">
        You do not own any SNES punks yet :(
      </div>
    }
  </>;
}

export default MyPunks;