import PunkImage from "@/components/punk-image"
import useSWR from "swr"

const randomPunkId = Math.floor(Math.random() * (9999 - 0 + 1)) + 0
export default function Home() {
  const { data: { data: punk } = {} } = useSWR(`/api/punks/${randomPunkId}`)

  return (
    <div className="flex flex-col justify-center items-center py-3 text-white space-y-16">
      <div className="container px-1 text-center text-xs text-red-400">
        NEWS: SNES Punks is releasing in the next few days, stay tuned on Twitter/Discord for more info soon.
      </div>

      <PunkImage {...punk} />

      <div className="container px-1 text-center">
        The SNES (16-Bits) Punks are conversions of the 10000 original punks inspired by 16-Bits art style.
      </div>

      <div className="container px-1 text-center">
        This is an inclusive collection and all 10000 SNES (16-Bits) Punks will be priced at 0.03 ETH in the primary market to make it affordable for everyone to collect!
      </div>

      <div className="container px-1 text-center">
        This project is inspired by the 90's videogames generation, a parody of the OG CryptoPunks and is NOT affiliated with Larva Labs.
      </div>

      <div className="flex justify-center space-x-5 pb-5">
        <a href="https://twitter.com/SNESPunks" target="_blank"><i className="nes-icon twitter is-large cursor-pointer inline-block" /></a>
        <a href="https://discord.gg/GA6kE84Ax2" target="_blank"><img src='/discord.png' className="cursor-pointer inline-block" width={64} height={64} /></a>
      </div>
    </div>
  )
}
