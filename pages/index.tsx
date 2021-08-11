import Head from 'next/head'
import { ethers } from 'ethers'
import SNESPunks from '@/artifacts/contracts/SNESPunks.sol/SNESPunks.json'

const snesPunksAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

export default function Home() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      home
    </div>
  )
}
