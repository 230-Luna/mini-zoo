import { GlobalStyle } from "components/GlobalStyle";
import { Layout } from "components/Layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalStyle>
    </>
  );
}
