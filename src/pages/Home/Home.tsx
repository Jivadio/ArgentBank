import { Banner } from "../../components/Banner/Banner"
import { Card } from "../../components/Card/Card"
import { cardContent } from "../../data/cardData"
import styles from "./Home.module.css"

export function Home() {
  return (
    <main>
      <Banner />
      <section className={styles.features}>
        <h2 className={styles.sr_only}>Features</h2>

        {cardContent.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </section>
    </main>
  )
}
