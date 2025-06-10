import styles from "./header.module.css";
import Image from "next/image";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Image
          src="/assets/mb-logo.svg"
          alt="Moneybox Logo"
          width={320}
          height={50}
          className={styles.logo}
        />
      </div>
    </header>
  );
};
