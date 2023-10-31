import Head from "next/head";
import GradientBG from "./GradientBG.js";
import styles from "../styles/Home.module.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Mina zkApp UI</title>
        <meta name="description" content="built with o1js" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <GradientBG>{children}</GradientBG>
    </>
  );
}
