import styles from "./CardAccount.module.css"
import type { accountProps } from "../../types/components.types"

export function CardAccount({
  title,
  amount,
  amountDescription,
}: accountProps) {
  return (
    <section className={styles.account}>
      <div className={styles.account_content_wrapper}>
        <h3 className={styles.account_title}>{title}</h3>
        <p className={styles.account_amount}>{amount}</p>
        <p className={styles.account_amount_description}>{amountDescription}</p>
      </div>
      <div className={`${styles.account_content_wrapper} ${styles.cta}`}>
        <button className={styles.transaction_button}>View transactions</button>
      </div>
    </section>
  )
}
