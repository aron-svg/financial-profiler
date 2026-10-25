import { Link } from 'react-router-dom'
import styles from './Welcome.module.css'

export default function Welcome() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Capital / Clair · planification financière</p>
        <h1>Votre argent mérite un plan.</h1>
        <p className={styles.lead}>En quelques étapes, visualisez votre capacité d'épargne et les trajectoires possibles de votre capital.</p>
        <Link className={styles.cta} to="/finances">Commencer ma simulation <span>↗</span></Link>
        <div className={styles.meta}><span>01 · Situation</span><span>02 · Profil</span><span>03 · Projection</span></div>
      </section>
      <section className={styles.preview} aria-label="Aperçu de la simulation">
        <div className={styles.previewTop}><span>PROJECTION · 10 ANS</span><strong>+ 201 867 €</strong></div>
        <div className={styles.wave}><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className={styles.previewBottom}><span>Capital projeté</span><span>à partir de 1 300 € / mois</span></div>
      </section>
    </div>
  )
}
