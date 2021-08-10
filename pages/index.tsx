import Head from 'next/head'
import { ethers } from 'ethers'
import SNESPunks from '@/artifacts/contracts/SNESPunks.sol/SNESPunks.json'

const snesPunksAddress = "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1"

export default function Home() {
  async function requestAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts)
  }

  async function mintToken() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(snesPunksAddress, SNESPunks.abi, signer)
      const transaction = await contract.mintToken({ value: ethers.utils.parseEther("0.03") })
      await transaction.wait()
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log(account)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(snesPunksAddress, SNESPunks.abi, provider)
      const balance = await contract.balanceOf(account);
      for (var i = 0; i < balance.toNumber(); i++) {
        const token = await contract.tokenOfOwnerByIndex(account, i)
        const tokenId = token.toNumber()
        console.log('You have the punk #' + tokenId)
      }
    }
  }

  async function getTokenURI() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(snesPunksAddress, SNESPunks.abi, provider)
      const tokenURI = await contract.tokenURI(1);
      console.log("tokenURI: ", tokenURI);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
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

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}
