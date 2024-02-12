import styles from "./Banner.module.css"
import bannerBackground from "../../assets/images/bank-tree.jpeg"

export function Banner() {
  return (
    <div
      className={styles.hero}
      style={{ backgroundImage: `url(${bannerBackground})` }}
    >
      <section className={styles.hero_content}>
        <h2 className={styles.sr_only}>Promoted Content</h2>
        <p className={styles.hero_content_subtitle}>No fees.</p>
        <p className={styles.hero_content_subtitle}>No minimum deposit.</p>
        <p className={styles.hero_content_subtitle}>High interest rates.</p>
        <p className={styles.hero_content_text}>
          Open a savings account with Argent Bank today!
        </p>
      </section>
    </div>
  )
}
