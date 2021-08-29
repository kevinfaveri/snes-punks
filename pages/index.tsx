import PunkImage from "@/components/punk-image"
import useSWR from "swr"
import Link from 'next/link'

const randomPunkId = Math.floor(Math.random() * (9999 - 0 + 1)) + 0
export default function Home() {
  const { data: punk = {} } = useSWR(`/api/punks/${randomPunkId}`)

  return (
    <div className="flex flex-col justify-center text-xs items-center py-3 text-white space-y-16">
      <PunkImage {...punk} />

      <div>
        <a
          href="https://opensea.io/collection/snespunks"
          target="_blank"
          className="text-blue-200 hover:text-blue-300 hover:no-underline" rel="noreferrer">
          TRADE ON OPEN SEA
        </a>

        <span> OR </span>
        <Link href="/mint">
          <a className="text-blue-200 hover:text-blue-300 uppercase hover:no-underline">
            MINT YOUR OWN
          </a>
        </Link>
      </div>

      <div className="flex justify-center space-x-5 pb-5 items-center">
        <a href="https://twitter.com/SNESPunks" target="_blank" rel="noreferrer"><i className="nes-icon twitter is-large cursor-pointer inline-block" /></a>
        <a href="https://discord.gg/GA6kE84Ax2" target="_blank" rel="noreferrer"><img src='/discord.png' className="cursor-pointer inline-block" width={64} height={64} /></a>
      </div>

      <div className="container px-1 text-center">
        This is an inclusive collection and all 10000 SNES Punks (made by an AI specialist in 16-Bits art style), inspired by the originals, will be priced at 0.02 ETH in the primary market to make it affordable for everyone to collect! This value of the token, which is sent to the SNES Punks creator, will then be used for supporting improvements of the WebApp, maintaining cloud services operational, and investing in the community.
      </div>

    </div>
  )
}
