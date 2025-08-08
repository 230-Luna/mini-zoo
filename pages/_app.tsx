import { GlobalStyle } from "components/GlobalStyle";
import { Layout } from "components/Layout";
import { PortalProvider } from "components/Portal";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle>
        <PortalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PortalProvider>
      </GlobalStyle>
    </>
  );
}
