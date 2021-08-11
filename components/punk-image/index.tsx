import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router'
import useOnScreen from 'hooks/useOnScreen';

const PunkImage: React.FC = (punk: any) => {
  const router = useRouter()
  const [loadingImage, setLoadingImage] = useState(true);
  const { isOnScreen, setRef } = useOnScreen('700px')

  useEffect(() => {
    setLoadingImage(true)
  }, [punk.id])

  return <div className="inline-block p-5" style={{ width: `350px` }}>
    {!loadingImage ? null :
      <div
        className="animate-pulse flex 
        justify-center 
        align-middle 
        items-center
        font-bold text-white text-xs uppercase"
        style={{
          backgroundColor: `#${punk.background_color}`,
          height: '350px',
          width: '350px',
        }}
      >
        <span>Loading art...</span>
      </div>
    }
    <img
      style={!loadingImage ? undefined : { visibility: 'hidden' }}
      src={isOnScreen ? punk.image : null}
      ref={setRef}
      alt={punk.name}
      width={350}
      height={350}
      className="rounded-t-md cursor-pointer inline-block"
      onClick={() => router.push(`/gallery/${punk.id}`)}
      onLoad={() => setLoadingImage(false)}
    />
  </div>;
}

export default PunkImage;