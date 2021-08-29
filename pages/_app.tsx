import 'tailwindcss/tailwind.css'
import "nes.css/css/nes.min.css";
import "./global.css"
import Layout from '@/components/layout';
import { Toaster } from 'react-hot-toast';
import { WalletProvider } from 'hooks/use-web-3';

function MyApp({ Component, pageProps }: any) {
  return <WalletProvider initialType={null}>
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  </WalletProvider>
}

export default MyApp
