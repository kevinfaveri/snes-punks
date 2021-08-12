import Head from 'next/head'
import { ethers } from 'ethers'
import SNESPunks from '@/artifacts/contracts/SNESPunks.sol/SNESPunks.json'
import { mintPunk } from '@/utils/web3';

const snesPunksAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

export default function Mint() {
  async function requestAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts)
  }

  async function mintToken() {
    if (typeof window?.ethereum !== 'undefined') {
      try {
        await requestAccount()
        const transaction = await mintPunk(window.ethereum)
        const final = await transaction.wait()
        console.log(final)
      } catch (error) {
        console.error(error)
      }
    }
  }
  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log(account)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(snesPunksAddress, SNESPunks.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log(balance.toNumber())
      for (var i = 0; i < balance.toNumber(); i++) {
        const token = await contract.tokenOfOwnerByIndex(account, i)
        const tokenId = token.toNumber()
        const tokenURI = await contract.tokenURI(tokenId);
        console.log(`You have the punk #${tokenId + 1}`)
        console.log("tokenURI: ", tokenURI);
      }
    }
  }

  async function getTokenURI() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(snesPunksAddress, SNESPunks.abi, provider)

      const nextToBeMinted = await contract.getNextTokenIdToBeMinted()
      console.log(`The next token to be minted will be #${nextToBeMinted.toNumber() + 1}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>SNES Punks - Mint</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="App">
          <header className="flex flex-col space-y-5">
            <button onClick={mintToken}>Mint Token</button>
            <button onClick={getBalance}>Get Balance</button>
            <button onClick={getTokenURI}>Get TokenURI</button>
          </header>
        </div>
      </main>
    </div>
  )
}
