import { useEffect } from "react";
import styles from "../../styles/Demo.module.css";
import AuthenticateCard from "../../components/AuthenticateCard";
import VerifyCard from "../../components/VerifyCard";

export default function Demo() {
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>DEMO</h2>
      <div className={styles.grid}>
        <AuthenticateCard />
        <VerifyCard />
      </div>
    </main>
  );
}
