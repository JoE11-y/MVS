import { useEffect, useCallback } from "react";
import styles from "@/styles/Demo.module.css";
import AuthenticateCard from "@/components/AuthenticateCard";
import VerifyCard from "@/components/VerifyCard";
import { useMinaContext } from "@/context/MinaContext";
import ConnectWallet from "@/components/ConnectWallet";

const { init } = await import("@/lib/mina");

export default function Demo() {
  const { updateState, state } = useMinaContext()

  const checkState = useCallback(async () => {
    const { accountPubKey, network, walletConnected, accountExists, hasWallet } = await init()
    updateState({
      network: network,
      publicKey58: accountPubKey,
      walletConnected: walletConnected,
      hasWallet: hasWallet,
      accountExists: accountExists
    });

  }, [updateState])

  useEffect(() => {
    checkState()
  }, [checkState])

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>DEMO</h2>

      {state.walletConnected ?
        <div className={styles.grid}>
          <AuthenticateCard />
          <VerifyCard />
        </div> :
        <div className={styles.flex}>
          <ConnectWallet />
        </div>
      }

    </main>
  );
}
