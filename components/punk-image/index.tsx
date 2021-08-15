import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router'
import useOnScreen from 'hooks/use-on-screen';

const PunkImage: React.FC = (punk: any) => {
  const router = useRouter()
  const [loadingImage, setLoadingImage] = useState(true);
  const { isOnScreen, setRef } = useOnScreen('700px')

  useEffect(() => {
    setLoadingImage(true)
  }, [punk.id])

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
      style={!loadingImage ? {} : { position: 'absolute', visibility: 'hidden' }}
      src={isOnScreen ? punk.image : null}
      ref={setRef}
      alt={punk.name}
      className="rounded-t-md cursor-pointer inline-block w-48 md:w-72"
      onClick={() => router.push(`/gallery/${punk.id}`)}
      onLoad={() => setLoadingImage(false)}
    />
  </div>;
}

export default PunkImage;