import { useWalletManager, useWeb3 } from 'hooks/use-web-3'
import Header from '../header'
import WalletModal from '../wallet-modal'

export default function Layout({ children }) {
  const { typeManager, errorManager } = useWalletManager()
  const web3Info = useWeb3()
  return (
    <div className="h-full">
      <Header />
      <main className="pt-20 h-full">
        {!typeManager.type && !web3Info.provider && <WalletModal 
        onSelectWallet={typeManager.setType} 
        error={errorManager.error}
        isOpen />}
        {children}
      </main>
    </div>
  )
}