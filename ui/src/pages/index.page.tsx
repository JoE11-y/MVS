import Head from "next/head";
import { useEffect } from "react";
import GradientBG from "../components/GradientBG.js";
import styles from "../styles/Home.module.css";
import Logo from "../components/Logo.tsx";

export default function Home() {
  useEffect(() => {
    (async () => {
      const { Mina, PublicKey } = await import("o1js");
      const { Add } = await import("../../../contracts/build/src/");

      // Update this to use the address (public key) for your zkApp account.
      // To try it out, you can try this address for an example "Add" smart contract that we've deployed to
      // Berkeley Testnet B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA.
      const zkAppAddress = "";
      // This should be removed once the zkAppAddress is updated.
      if (!zkAppAddress) {
        console.error(
          'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA'
        );
      }
      //const zkApp = new Add(PublicKey.fromBase58(zkAppAddress))
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Mina zkApp UI</title>
        <meta name="description" content="built with o1js" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <GradientBG>
        <main className={styles.main}>
          <h2 className={styles.title}>MINA VERIFICATION SERVICE</h2>
          <div className={styles.flex}>
            <div className={styles.card}>
              <Logo />
              <p className={styles.start}>
                Introducing MVS - Mina Verification Service, a project that
                provides advanced identity verification and authentication
                measures to safeguard the security of web3 platforms using
                Mina&apos;s zero-knowledge proofs down approach, to provide a
                secure and scalable solution for private applications in the
                web3 space. Join MVS and secure the future of web3.
              </p>
            </div>
          </div>
          <button className={styles.button}>JOIN WAITLIST</button>
        </main>
      </GradientBG>
    </>
  );
}
