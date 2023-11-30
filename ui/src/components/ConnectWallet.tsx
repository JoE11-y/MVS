import styles from "@/styles/Demo.module.css";
import style from "@/styles/Home.module.css";
import Image from "next/image";
// import * as mina from "@/lib/mina";
import { useMinaContext } from "@/context/MinaContext";

const { connect } = await import("@/lib/mina");
export default function ConnectWallet() {
    const { updateState } = useMinaContext()

    const connectW = async () => {
        try {
            const { accountPubKey, network, walletConnected, accountExists } = await connect()
            updateState({
                network: network,
                publicKey58: accountPubKey,
                walletConnected: walletConnected,
                accountExists: accountExists
            });
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.card}>
            <h2>
                <span>CONNECT MINA WALLET</span>
            </h2>
            <div style={{ height: "4rem" }}>
                <Image
                    src="/assets/wallet.svg"
                    width={50}
                    height={50}
                    alt="connect"
                />
            </div>

            <p className={styles.start}></p>


            <button className={style.button} onClick={() => connectW()}>Start</button>
        </div>
    );
}
