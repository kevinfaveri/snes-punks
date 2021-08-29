import { ethers } from 'ethers'
import SNESPunks from '@/artifacts/contracts/SNESPunks.sol/SNESPunks.json'
const snesPunksAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

export async function switchEthereumChain(ethereum) {
  return await ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: process.env.NEXT_PUBLIC_CHAINID }],
  });
}

export async function requestAccount(ethereum) {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  return accounts
}

export async function mintPunk(provider) {
  const signer = provider.getSigner()
  const contract = new ethers.Contract(snesPunksAddress, SNESPunks.abi, signer)
  const transaction = await contract.mintToken({ value: ethers.utils.parseEther("0.02") })
  return transaction
}

export async function getBalance(provider) {
  const allTokens: number[] = [];
  const contract = new ethers.Contract(snesPunksAddress, SNESPunks.abi, provider)
  const [account] = await provider.listAccounts()
  const balance = await contract.balanceOf(account);

  for (var i = 0; i < balance.toNumber(); i++) {
    const token = await contract.tokenOfOwnerByIndex(account, i)
    const tokenId = token.toNumber()
    allTokens.push(tokenId)
    console.info(`You have the punk #${tokenId + 1}`)
  }

  return allTokens
}

export async function getTransaction(provider, transactionHash) {
  const transaction = await provider.getTransaction(transactionHash)
  const result = await transaction.wait()
  return result
}