import 'tailwindcss/tailwind.css'
import "nes.css/css/nes.min.css";
import "./global.css"
import Layout from '@/components/layout';
import { Toaster } from 'react-hot-toast';
import { requestAccount, switchEthereumChain } from '@/utils/web3';

if (process.browser) {
  if (window.ethereum !== undefined) {
    switchEthereumChain(window.ethereum).then(() => {
      requestAccount(window.ethereum)
    })
  }
}
function MyApp({ Component, pageProps }: any) {
  return <Layout>
    <Component {...pageProps} />
    <Toaster />
  </Layout>
}

export default MyApp
