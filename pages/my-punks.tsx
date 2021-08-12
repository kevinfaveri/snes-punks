import PunkCard from '@/components/punk-card';
import { getBalance } from '@/utils/web3';
import usePunks from 'hooks/usePunks';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const MyPunks: React.FC = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([])
  const { punks, isLoadingMore } = usePunks()

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      getBalance(window.ethereum).then((tokenIds) => {
        setTokenIds(tokenIds)
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
        return <div className="flex flex-col items-center justify-center">
          <PunkCard
            {...punk}
            key={punk.id}
            shareMessage={`Just got my SNES Punk #${punk.id + 1}!`} />
        </div>
      })}

    </div>
    {
      isLoadingMore &&
      <div className="text-white font-bold text-sm mt-5 text-center animate-pulse">
        Loading punks...
      </div>
    }

    {
      !isLoadingMore && tokenIds.length === 0 &&
      <div className="text-white font-bold text-sm mt-5 pl-2 text-center">
        You do not own any SNES punks yet :(
      </div>
    }
  </>;
}

export default MyPunks;