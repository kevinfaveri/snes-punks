import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

const PunkCard: React.FC = (punk: any) => {
  const [loadingImage, setLoadingImage] = useState(true);
  useEffect(() => {
    setLoadingImage(true)
  }, [punk.id])
  const imageRef: any = useRef()
  useEffect(() => {
    if (imageRef.current.complete) setLoadingImage(false)
  }, [])

  return <div className="inline-block p-5 w-48 md:w-72">
    {!loadingImage ? null :
      <div
        className="animate-pulse flex 
        justify-center 
        align-middle 
        items-center
        font-bold text-white text-xs uppercase bg-nftbg w-48 md:w-72 h-48 md:h-72"
      >
        <span>Loading art...</span>
      </div>
    }
    <img
      style={!loadingImage ? {} : { display: 'none' }}
      ref={imageRef}
      src={punk.image}
      alt={punk.name}
      className="rounded-t-md w-48 md:w-72"
      onLoad={() => setLoadingImage(false)}
    />

    <div className="flex flex-col justify-center space-y-3 p-3 
    font-bold bg-gray-100 opacity-70 rounded-sm text-xs text-nftbg">
      <span className="text-center uppercase">{punk.name}</span>
      <TwitterShareButton
        url={`https://snespunks.com/gallery/${punk.id}`}
        title={punk.shareMessage || `I want my SNES Punk #${punk.id + 1}!`}
        via="SNESPunks"
        hashtags={['SNESPUNKS', 'NFT', 'CRYPTOPUNKS', 'ETHEREUM']}
        related={['SNESPunks', 'kevinfaveri_']}>
        <span className="text-xss md:text-xs text-blue-300 hover:text-blue-400">
          SHARE ON TWITTER
        </span>
      </TwitterShareButton>
      <TelegramShareButton
        url={`https://snespunks.com/gallery/${punk.id}`}
        title={punk.shareMessage || `I want my SNES Punk #${punk.id}!`}>
        <span className="text-xss md:text-xs text-blue-300 hover:text-blue-400">
          SHARE ON TELEGRAM
        </span>
      </TelegramShareButton>
    </div>
  </div>;
}

export default PunkCard;