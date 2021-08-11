import 'tailwindcss/tailwind.css'
import "nes.css/css/nes.min.css";
import "./global.css"
import Layout from '@/components/layout';

function MyApp({ Component, pageProps }: any) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
