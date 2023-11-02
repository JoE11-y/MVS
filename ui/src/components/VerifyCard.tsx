import styles from "../styles/Demo.module.css";
import style from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

export default function VerifyCard() {
  return (
    <div className={styles.card}>
      <h2>
        <span>VERIFY USER IDENTITY</span>
      </h2>
      <div style={{ height: "4rem" }}>
        <Image src="/assets/verify.svg" width={70} height={70} alt="verify" />
      </div>

      <p className={styles.start}></p>
      <Link href={"/demo/verify"}>
        <button className={style.button}>Start</button>
      </Link>
    </div>
  );
}
