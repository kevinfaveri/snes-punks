import PunkCard from '@/components/punk-card';
import PunkImage from '@/components/punk-image';
import { getBalance } from '@/utils/web3';
import usePunks from 'hooks/usePunks';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';


const MyPunks: React.FC = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([])
  const { punks, isEndReached } = usePunks()

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
    <div>
      {tokenIds.map((_, index) => {
        const punk: any = punks[index]
        return <PunkCard {...punk} key={punk.id} />
      })}

    </div>
    {
      tokenIds.length === 0 && isEndReached &&
      <div className="text-gray-700 font-bold text-sm mt-5">
        You do not own any SNES punks yet :(
      </div>
    }
  </>;
}

export default MyPunks;