import styles from "../../styles/Demo.module.css";
import style from "../../styles/Home.module.css";
import { useState } from "react";

const { checkUser } = await import("@/lib/mina");

export default function Verify() {
    const [pubKey, setPubKey] = useState('');
    const check = async (e: any) => {
        e.preventDefault();
        try {
            await checkUser(pubKey)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <main className={styles.main}>
            <h2 className={styles.title}>VERIFY</h2>
            <div className={styles.card}>
                <span className={style.start} style={{ minHeight: "50px" }}>
                    Enter wallet address to be checked
                </span>
                <form onSubmit={check} id="verify-form">
                    <input
                        name="address"
                        id="address"
                        placeholder="B62qjsb....e9Psbgb"
                        type="text"
                        value={pubKey}
                        onChange={(event) => setPubKey(event.target.value)}
                    />
                    <button type="submit" className={style.button}>Verify</button>
                </form>
            </div>
        </main>
    );
}
