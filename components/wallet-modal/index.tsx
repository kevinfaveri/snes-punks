import React, { useRef } from 'react';
import PropTypes, { InferProps } from 'prop-types'
import { Dialog } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const WalletModalProps = {
  activeWalletType: PropTypes.string,
  onSelectWallet: PropTypes.func.isRequired,
  error: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func,
}

const WalletModal: React.FC<InferProps<typeof WalletModalProps>> = ({
  activeWalletType,
  onSelectWallet,
  error,
  isOpen = false,
  setIsOpen
}) => {
  const closeButtonRef = useRef();

  return <Dialog initialFocus={closeButtonRef as any} open={isOpen} onClose={setIsOpen ? () => setIsOpen(false) : () => null} className="fixed z-10 inset-0 overflow-y-auto"
  >

    <div className="relative flex items-center justify-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="relative flex flex-col bg-white rounded max-w-3xl mx-auto p-5 shadow-md items-center">

        <Dialog.Title className="text-3xl text-center flex relative space-x-10">
          <span>SELECT YOUR WALLET</span>
          <button
            ref={closeButtonRef as any}
            onClick={setIsOpen ? () => setIsOpen(false) : () => null}
            className={`bg-gray-300 hover:bg-gray-400 text-white rounded-md p-3 text-xs
               ${setIsOpen ? '' : 'hidden'}`}>
            X
          </button>
        </Dialog.Title>
        <Dialog.Description className="flex space-x-5 items-center">
          <button
            className={`${activeWalletType === 'injected' ? 'bg-gray-200' : 'bg-white'} rounded-md hover:bg-gray-200 p-3 flex flex-col space-y-5 items-center`}
            onClick={activeWalletType === 'injected' ? () => {
              onSelectWallet(null)
              if (setIsOpen) setIsOpen(false)
            } : () => onSelectWallet('injected')}>
            <div className="flex">
              <img className="h-16" src="/metamask.png" />
              <img className="h-16" src="/coinbase.png" />
            </div>
            <span>BROWSER INJECTED</span>
          </button>
          <button
            className={`${activeWalletType === 'wallet_connect' ? 'bg-gray-200' : 'bg-white'} bg-white rounded-md hover:bg-gray-200 p-3 flex flex-col items-center space-y-5`}
            onClick={activeWalletType === 'wallet_connect' ? () => {
              onSelectWallet(null)
              if (setIsOpen) setIsOpen(false)
            } : () => onSelectWallet('wallet_connect')}>
            <img className="h-16" src="/walletconnect.svg" />
            <span>WALLET CONNECT</span>
          </button>
        </Dialog.Description>

        <div className="text-red-600 text-center text-sm">
          {error}
        </div>
      </div>
    </div>
  </Dialog>;
}

export default WalletModal;