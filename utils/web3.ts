import { ethers } from 'ethers'
import SNESPunks from '@/artifacts/contracts/SNESPunks.sol/SNESPunks.json'
const snesPunksAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

export async function switchEthereumChain(ethereum) {
  return await ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: '0x1' }],
  });
}

export async function requestAccount(ethereum) {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  return accounts
}

export async function mintPunk(ethereum) {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner()
  const contract = new ethers.Contract(snesPunksAddress, SNESPunks.abi, signer)
  const transaction = await contract.mintToken({ value: ethers.utils.parseEther("0.02") })
  return transaction
}

export async function getBalance(ethereum) {
  const allTokens: number[] = [];
  const [account] = await ethereum.request({ method: 'eth_requestAccounts' })
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = new ethers.Contract(snesPunksAddress, SNESPunks.abi, provider)
  const balance = await contract.balanceOf(account);
  for (var i = 0; i < balance.toNumber(); i++) {
    const token = await contract.tokenOfOwnerByIndex(account, i)
    const tokenId = token.toNumber()
    allTokens.push(tokenId)
    console.info(`You have the punk #${tokenId + 1}`)
  }

  return allTokens
}

export async function getTransaction(ethereum, transactionHash) {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const transaction = await provider.getTransaction(transactionHash)
  const result = await transaction.wait()
  return result
}