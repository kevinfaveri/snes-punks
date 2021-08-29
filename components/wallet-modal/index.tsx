import React, { useRef } from 'react';
import PropTypes, { InferProps } from 'prop-types'
import { Dialog } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const WalletModalProps = {
  onSelectWallet: PropTypes.func.isRequired,
  error: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func,
}

const WalletModal: React.FC<InferProps<typeof WalletModalProps>> = ({ onSelectWallet, error, isOpen = false, setIsOpen }) => {
  const closeButtonRef = useRef();

  return <Dialog initialFocus={closeButtonRef as any} open={isOpen} onClose={setIsOpen ? () => setIsOpen(false) : () => null} className="fixed z-10 inset-0 overflow-y-auto"
  >

    <div className="relative flex items-center justify-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="relative flex flex-col bg-white rounded max-w-3xl mx-auto p-5 shadow-md items-center">

        <Dialog.Title className="text-3xl text-center flex">
          <span>SELECT YOUR WALLET</span>
          <button
            ref={closeButtonRef as any}
            className={`absolute right-3 bg-gray-300 hover:bg-gray-400 text-white rounded-md px-3 
        flex justify-center uppercase ${setIsOpen ? '' : 'hidden'}`}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </Dialog.Title>
        <Dialog.Description className="flex space-x-5 items-center">
          <button
            className="bg-white rounded-md hover:bg-gray-200 p-3 flex flex-col space-y-5 items-center"
            onClick={() => onSelectWallet('injected')}>
            <div className="flex">
              <img className="h-16" src="/metamask.png" />
              <img className="h-16" src="/coinbase.png" />
            </div>
            <span>BROWSER INJECTED</span>
          </button>
          <button
            className="bg-white rounded-md hover:bg-gray-200 p-3 flex flex-col items-center space-y-5"
            onClick={() => onSelectWallet('wallet_connect')}>
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