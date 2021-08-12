import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

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
    font-bold bg-gray-200 rounded-md shadow-md text-xs text-nftbg">
      <span className="text-center">{punk.name}</span>
      <span className="text-center">{punk.description}</span>
    </div>
  </div>;
}

export default PunkCard;