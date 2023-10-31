import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";

import "./reactCOIServiceWorker";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
