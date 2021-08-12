import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          < script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-B5NTQHS1J6`
            }
          />
          < script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-B5NTQHS1J6');
          `,
            }}
          />
        </Head>
        < body >
          <Main />
          < NextScript />
        </body>
      </Html>
    )
  }
}