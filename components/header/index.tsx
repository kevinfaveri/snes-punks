import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const router = useRouter()

  return <header>
    <Head>
      <title>SNES Punks</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
    </Head>

    <ul className="absolute flex rounded-br-md 
    shadow-md bg-white py-2 text-nftbg h-14">
      <li className="mr-6">
        <button
          type="button"
          className="flex px-2 rounded-lg transition hover:text-white hover:bg-nftbg"
          onClick={() => router.push('/')}>
          <img src="/favicon.png" className="h-10" />
          <div className="h-10 flex items-center">Home</div>
        </button>
      </li>
      <li className="mr-6">
        <button
          type="button"
          className="flex px-2 rounded-lg transition hover:text-white hover:bg-nftbg"
          onClick={() => router.push('/gallery')}>
          <img src="/first_nft.png" className="h-10" />
          <div className="h-10 flex items-center">Gallery</div>
        </button>
      </li>
      <li className="mr-6">
        <button
          type="button"
          className="flex px-2 rounded-lg transition hover:text-white hover:bg-nftbg"
          onClick={() => router.push('/mint')}>
          <img src="/monkey_nft.png" className="h-10" />
          <div className="h-10 flex items-center">Mint</div>
        </button>
      </li>
      <li className="mr-6">
        <button
          type="button"
          className="flex px-2 rounded-lg transition hover:text-white hover:bg-nftbg"
          onClick={() => router.push('/my-punks')}>
          <img src="/alien_nft.png" className="h-10" />
          <div className="h-10 flex items-center">My Punks</div>
        </button>
      </li>
    </ul>
  </header>;
}

export default Header;