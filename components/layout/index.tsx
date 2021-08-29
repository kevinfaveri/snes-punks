import { useWalletManager } from 'hooks/use-web-3'
import Header from '../header'
import WalletModal from '../wallet-modal'

export default function Layout({ children }) {
  const { typeManager, errorManager } = useWalletManager()
  return (
    <div className="h-full">
      <Header />
      <main className="pt-20 h-full">
        {(!typeManager.type || errorManager.error) && <WalletModal
          activeWalletType={typeManager.type}
          onSelectWallet={typeManager.setType}
          error={errorManager.error}
          isOpen />}
        {children}
      </main>
    </div>
  )
}