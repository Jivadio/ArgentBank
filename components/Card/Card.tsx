import styles from "./Card.module.css"
import type { cardProps } from "../../types/components.types"

export function Card({ icon, title, text }: cardProps) {
  return (
    <div className={styles.feature_item}>
      <img src={icon} alt="Chat Icon" className={styles.feature_icon} />
      <h3 className={styles.feature_item_title}>{title}</h3>
      <p>{text}</p>
    </div>
  )
}
