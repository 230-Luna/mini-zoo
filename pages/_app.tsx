import { GlobalStyle } from "components/GlobalStyle";
import { Layout } from "components/Layout";
import { PortalProvider } from "components/Portal";
import { OverlayProvider } from "hooks/useOverlay";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle>
        <PortalProvider>
          <OverlayProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </OverlayProvider>
        </PortalProvider>
      </GlobalStyle>
    </>
  );
}
