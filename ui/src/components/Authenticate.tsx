import { useEffect } from "react";
import styles from "../styles/Demo.module.css";
import style from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Authenticate() {
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
    <div className={styles.card}>
      <h2>
        <span>AUTHENTICATE SOCIAL IDENTITY</span>
      </h2>
      <div style={{ height: "4rem" }}>
        <Image
          src="/assets/auth.svg"
          width={50}
          height={50}
          alt="authenticate"
        />
      </div>

      <p className={styles.start}></p>

      <Link href={"/api/auth/signin"}>
        <button className={style.button}>Start</button>
      </Link>
    </div>
  );
}
