import PunkImage from '@/components/punk-image';
import usePunks from 'hooks/use-punks';
import Head from 'next/head';
import React from 'react';


const Gallery: React.FC = () => {
  const { punks, isEndReached, setRefInfiniteLoading } = usePunks()
  return <>
    <Head>
      <title>SNES Punks - Gallery</title>
    </Head>
    <div className="flex flex-wrap justify-center">
      {punks.map((punk: any) => {
        return <PunkImage {...punk} key={punk.id} />
      })}

    </div>
    {
      !isEndReached &&
      <div className="text-white font-bold text-sm animate-pulse mt-5 text-center" ref={setRefInfiniteLoading}>
        Loading more Punks...
      </div>
    }
    {
      punks.length === 0 && isEndReached &&
      <div className="text-gray-700 font-bold text-sm mt-5">
        No Punks were found :(
      </div>
    }
  </>;
}

export default Gallery;