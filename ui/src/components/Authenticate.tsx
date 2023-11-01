import styles from "../styles/Demo.module.css";
import style from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Authenticate() {
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
