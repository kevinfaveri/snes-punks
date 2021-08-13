import PunkCard from '@/components/punk-card';
import { getBalance } from '@/utils/web3';
import toast from 'react-hot-toast';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const MyPunks: React.FC = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([])
  const { data, isValidating } = useSWR(tokenIds.length ? `/api/punks?${tokenIds.map((id) => `ids=${id}&`).join('')}` : null)
  const punks = data?.data || []

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined' && Number(window.ethereum.networkVersion) === 1) {
      getBalance(window.ethereum).then((tokenIds) => {
        setTokenIds(tokenIds)
      })
    } else {
      toast.error('Invalid network, please switch back to mainnet', {
        duration: 10000,
        position: 'bottom-right'
      })
    }
  }, [])

  return <>
    <Head>
      <title>SNES Punks - My Punks</title>
    </Head>
    <div className="flex flex-wrap justify-center space-x-5">
      {punks.length > 0 && tokenIds.map((_, index) => {
        const punk: any = punks[index]
        return <div key={punk.id} className="flex flex-col items-center justify-center">
          <PunkCard
            {...punk}
            shareMessage={`Just got my SNES Punk #${punk.id + 1}!`} />
        </div>
      })}

    </div>
    {
      isValidating &&
      <div className="text-white font-bold text-sm mt-5 text-center animate-pulse">
        Loading punks...
      </div>
    }

    {
      punks.length === 0 && tokenIds.length === 0 &&
      <div className="text-white font-bold text-sm mt-5 pl-2 text-center">
        You do not own any SNES punks yet :(
      </div>
    }
  </>;
}

export default MyPunks;