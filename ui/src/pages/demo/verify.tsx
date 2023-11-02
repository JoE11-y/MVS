import { useEffect } from "react";
import styles from "../../styles/Demo.module.css";

export default function Verify() {
    useEffect(() => {
        (async () => {
            const { Mina, PublicKey } = (await import("o1js"));
            const { Add } = await import('../../../../contracts/build/contracts/src');
            // // Update this to use the address (public key) for your zkApp account.
            // // To try it out, you can try this address for an example "Add" smart contract that we've deployed to
            // // Berkeley Testnet .
            const zkAppAddress = "B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA";
            // // This should be removed once the zkAppAddress is updated.
            // if (!zkAppAddress) {
            //   console.error(
            //     'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA'
            //   );
            // }
            const zkApp = new Add(PublicKey.fromBase58(zkAppAddress));
        })();
    }, []);
    return (
        <main className={styles.main}>
            <h2 className={styles.title}>VERIFY</h2>
        </main>
    );
}
