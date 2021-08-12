import 'tailwindcss/tailwind.css'
import "nes.css/css/nes.min.css";
import "./global.css"
import Layout from '@/components/layout';
import { Toaster } from 'react-hot-toast';

if (process.browser) {
  if (window && window.ethereum !== undefined) {
    window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: '0x4' }],
    });
  }
}
function MyApp({ Component, pageProps }: any) {

  return <Layout>
    <Component {...pageProps} />
    <Toaster />
  </Layout>
}

export default MyApp
