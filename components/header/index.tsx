import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WalletModal from '../wallet-modal';
import { useWalletManager, useWeb3 } from 'hooks/use-web-3';

const Header: React.FC = () => {
  const router = useRouter()
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const { typeManager, errorManager } = useWalletManager()
  const { source } = useWeb3()

  return <>
    <header className="flex justify-center">
      <NextSeo
        title="SNES Punks"
        description="The SNES Punks are conversions of the 10000 original punks to 16-Bits art style made by an AI."
        openGraph={{
          url: "https://snespunks.com",
          title: 'SNES Punks',
          description: "The SNES Punks are conversions of the 10000 original punks to 16-Bits art style made by an AI.",
          images: [
            {
              url: "https://snespunks.com/favicon.png",
              width: 350,
              height: 350,
              alt: 'SNES Punks',
            },
          ],
          site_name: 'SNES Punks',
        }}
        twitter={{
          handle: '@SNESPunks',
          site: 'https://snespunks.com/',
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </Head>

      <ul className="flex rounded-b-md 
    shadow-md bg-white py-2 px-1 text-nftbg h-14
    text-xs md:text-sm">
        <li className="mr-6">
          <button
            type="button"
            className="flex px-2 rounded-lg transition hover:text-nftbg-lighter"
            onClick={() => router.push('/')}>
            <img src="/favicon.png" className="h-10" />
            <div className="h-10 flex items-center">Home</div>
          </button>
        </li>
        <li className="mr-6">
          <button
            type="button"
            className="flex px-2 rounded-lg transition hover:text-nftbg-lighter"
            onClick={() => router.push('/gallery')}>
            <img src="/first_nft.png" className="h-10" />
            <div className="h-10 flex items-center">Gallery</div>
          </button>
        </li>
        <li className="mr-6">
          <button
            type="button"
            className="flex px-2 rounded-lg transition hover:text-nftbg-lighter"
            onClick={() => router.push('/mint')}>
            <img src="/monkey_nft.png" className="h-10" />
            <div className="h-10 flex items-center">Mint</div>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="flex px-2 rounded-lg transition hover:text-nftbg-lighter"
            onClick={() => router.push('/my-punks')}>
            <img src="/alien_nft.png" className="h-10" />
            <div className="h-10 flex items-center">My Punks</div>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="border-l-8 border-bg-gray-400 flex px-5 transition hover:text-nftbg-lighter"
            onClick={() => setWalletModalOpen(true)}>
            <div className="h-10 flex items-center space-x-2">
              <span>Wallet</span>
              <FontAwesomeIcon
                icon={faWallet}
                className="h-5" />
            </div>
          </button>
        </li>
      </ul>
    </header>
    <WalletModal
      activeWalletType={typeManager.type}
      isOpen={walletModalOpen}
      setIsOpen={setWalletModalOpen}
      error={errorManager.error}
      onSelectWallet={(type) => {
        if (type === null && source.disconnect) source.disconnect()
        typeManager.setType(type)
      }} />
  </>;
}

export default Header;