import styles from "../styles/Home.module.css";
import Logo from "../components/Logo";
import WaitlistForm from "../components/Waitlist";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>MINA VERIFICATION SERVICE</h2>
      <div className={styles.flex}>
        <div className={styles.card}>
          <Logo />
          <p className={styles.start}>
            Introducing MVS - Mina Verification Service, a project that provides
            advanced identity verification and authentication measures to
            safeguard the security of web3 platforms using Mina&apos;s
            zero-knowledge proofs down approach, to provide a secure and
            scalable solution for private applications in the web3 space.
          </p>
          <p className={styles.start}>
            Join MVS and secure the future of web3.
          </p>

          <Link href={"/demo"} className={styles.links}>
            Go to DEMO
            <Image
              src="/assets/arrow-right-small.svg"
              width={20}
              height={20}
              alt="asdkjfj"
            />
          </Link>
        </div>
      </div>
      <WaitlistForm />
    </main>
  );
}
