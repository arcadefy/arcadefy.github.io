import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { Html, Head, Main, NextScript } from "next/document";
import config from '../../config.json';
import Script from "next/script";
import Footer from "@/components/Footer";

export default function Document() {

  return (
    <Html lang="en">
      <Head >

      <link rel="apple-touch-icon" sizes="180x180" href={`${config.SITE_URL}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${config.SITE_URL}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${config.SITE_URL}/favicon-16x16.png`} />
        <meta name="google-adsense-account" content={`${config.GOOGLE_ADSENSE}`} />
        <link rel="manifest" href={`${config.SITE_URL}/site.webmanifest`} />
        <meta name="theme-color" content="#05A"/>
        <meta name="application-name" content={config.SITE_NAME}/>


{config.GOOGLE_ADSENSE && (
        <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.GOOGLE_ADSENSE}`}
        crossOrigin="anonymous"
      />
)}

      </Head>
      <body className="antialiased">
        <Header />
        <Layout>
          <Main />
        </Layout>
        <Footer/>
        <NextScript />
      </body>
    </Html>
  );
}
