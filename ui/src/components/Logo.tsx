import Image from "next/image";
import styles from "@/styles/Home.module.css";
import heroMinaLogo from "../../public/assets/hero-mina-logo.svg";

export default function Logo() {
  return (
    <div className={styles.positionlogo}>
      <div className={styles.right}>
        <a
          href="https://minaprotocol.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className={styles.logo}
            src={heroMinaLogo}
            alt="Mina Logo"
            width="40"
            height="40"
            priority
          />
        </a>
        <p className={styles.tagline}>
          built with
          <code className={styles.code}> o1js</code>
        </p>
      </div>
    </div>
  );
}
