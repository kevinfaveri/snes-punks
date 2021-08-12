import React from 'react';
import { db, punksDb } from 'utils/pool';
import generateMetadata from 'utils/generate-metadata';
import PunkCard from '@/components/punk-card';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import {
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

const PunkDetails: React.FC<any> = ({ punk }) => {
  const [isFirstAccess, setIsFirstAccess] = useState(true)
  const router = useRouter()
  const { pid } = router.query
  const pidNumber = Number(pid)

  return <div className="grid grid-cols-4 gap-4 justify-center items-center h-full">
    <NextSeo
      title={punk.name}
      description={punk.description}
      openGraph={{
        url: punk.external_url,
        title: punk.name,
        description: punk.description,
        images: [
          {
            url: punk.image,
            width: 350,
            height: 350,
            alt: punk.name,
          },
        ],
        site_name: 'SNES Punks',
      }}
      twitter={{
        handle: '@SNESPunks',
        site: 'https://snespunks.com/',
        cardType: punk.name,
      }}
    />
    <div className="col-span-1 flex justify-end">
      {pidNumber !== 0 && <button
        type="button"
        onClick={() => {
          router.push(`/gallery/${pidNumber - 1}`)
          setIsFirstAccess(false)
        }}
        className="nes-btn is-primary uppercase text-2xl">
        ◄
      </button>}
    </div>
    <div className="col-span-2 flex flex-col items-center justify-center">
      <PunkCard {...punk} />
      <TwitterShareButton
        url={`https://snespunks.com/gallery/${punk.id}`}
        title={`I want my SNES Punk #${punk.id}!`}
        via="SNESPunks"
        hashtags={['SNESPUNKS', 'NFT', 'CRYPTOPUNKS', 'ETHEREUM']}
        related={['SNESPunks', 'kevinfaveri_']}>
        <span className="text-xs text-blue-300">SHARE ON TWITTER</span>
      </TwitterShareButton>
      <TelegramShareButton
        url={`https://snespunks.com/gallery/${punk.id}`}
        title={`I want my SNES Punk #${punk.id}!`}>
        <span className="text-xs text-blue-300">SHARE ON TELEGRAM</span>
      </TelegramShareButton>
    </div>
    <div className="col-span-1">
      {pidNumber !== 9999 && <button
        type="button"
        className="nes-btn is-primary uppercase text-sm"
        onClick={() => {
          router.push(`/gallery/${pidNumber + 1}`)
          setIsFirstAccess(false)
        }}>
        ►
      </button>}
    </div>
    {isFirstAccess && <div
      className="absolute top-20 left-5 font-bold text-white text-xs">
      TIP: You can edit the number in the URL replacing it in the range of the 10000 SNES 16-Bits Punks (0-9999)
    </div>}


  </div>;
}

export async function getStaticPaths() {
  return {
    paths: Array.from(Array(10000)).map((_, i) => ({ params: { pid: i.toString() } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const punk: any = await punksDb(db).findOne({ id: params.pid }) || {}
  const data = await generateMetadata(punk)

  return {
    props: {
      punk: data,
    },
    revalidate: 10,
  }
}

export default PunkDetails;