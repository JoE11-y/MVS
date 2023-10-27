import React from "react";
import clsx from "clsx";
import styles from "../styles/Home.module.css";
export default function WaitlistForm() {
  return (
    <form
      className={clsx(styles.formcard, "launchlist-form")}
      action="https://getlaunchlist.com/s/813Z0c"
      method="POST"
    >
      <input
        name="email"
        type="email"
        placeholder="Enter email"
        className={styles.tagline}
      />
      <button type="submit" className={styles.button}>
        Join Waitlist
      </button>
    </form>
  );
}
