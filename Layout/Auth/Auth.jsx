import React from "react";
import styles from "./Auth.module.css";
import Image from "next/image";

export default function Auth({ children }) {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.authBox}>
        <figure>
          <Image src="/images\logo.png" width={500} height={500} alt="Picture of the author" className={styles.authLogo}></Image>
        </figure>
        <div className={styles.formWrapper}>{children}</div>
      </div>
    </div>
  );
}
