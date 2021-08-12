import PunkCard from '@/components/punk-card';
import { getBalance } from '@/utils/web3';
import usePunks from 'hooks/usePunks';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import {
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

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
    <div className="flex">
      {punks.length > 0 && tokenIds.map((_, index) => {
        const punk: any = punks[index]
        return <div className="flex flex-col items-center justify-center">
          <PunkCard {...punk} key={punk.id} />
          <TwitterShareButton
            url={`https://snespunks.com/gallery/${punk.id}`}
            title={`Just got my SNES Punk #${punk.id}!`}
            via="SNESPunks"
            hashtags={['SNESPUNKS', 'NFT', 'CRYPTOPUNKS', 'ETHEREUM']}
            related={['SNESPunks', 'kevinfaveri_']}>
            <span className="text-xs text-blue-300">SHARE ON TWITTER</span>
          </TwitterShareButton>
          <TelegramShareButton
            url={`https://snespunks.com/gallery/${punk.id}`}
            title={`Just got my SNES Punk #${punk.id}!`}>
            <span className="text-xs text-blue-300">SHARE ON TELEGRAM</span>
          </TelegramShareButton>
        </div>
      })}

    </div>
    {
      punks.length === 0 && !isEndReached &&
      <div className="text-white font-bold text-sm mt-5 text-center animate-pulse">
        Loading punks...
      </div>
    }

    {
      tokenIds.length === 0 &&
      <div className="text-white font-bold text-sm mt-5 pl-2">
        You do not own any SNES punks yet :(
      </div>
    }
  </>;
}

export default MyPunks;