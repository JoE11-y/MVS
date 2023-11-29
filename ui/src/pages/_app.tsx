import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { MinaProvider } from "@/context/MinaContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <MinaProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MinaProvider>
    </SessionProvider>
  );
}
