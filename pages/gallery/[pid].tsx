import React from 'react';
import { readCSV } from "utils/read-dataset"
import generateMetadata from 'utils/generate-metadata';
import PunkCard from '@/components/punk-card';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PunkDetails: React.FC<any> = ({ punk }) => {
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
        }}
        className="nes-btn is-primary h-10 w-10">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>}
    </div>
    <div className="col-span-2 flex flex-col items-center justify-center">
      <PunkCard {...punk} />
    </div>
    <div className="col-span-1">
      {pidNumber !== 9999 && <button
        type="button"
        className="nes-btn is-primary h-10 w-10"
        onClick={() => {
          router.push(`/gallery/${pidNumber + 1}`)
        }}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>}
    </div>
  </div>;
}

export async function getStaticPaths() {
  return {
    paths: Array.from(Array(10000)).map((_, i) => ({ params: { pid: i.toString() } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const dataset: any = await readCSV()
  const punk: any = dataset.find((({id}) => Number(id) === Number(params.pid))) || {}
  const data = await generateMetadata(punk)

  return {
    props: {
      punk: data,
    },
    revalidate: 10,
  }
}

export default PunkDetails;