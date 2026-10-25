import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import styles from './StepLayout.module.css'

type StepLayoutProps = { step: string; title: string; description: string; children: ReactNode }

export default function StepLayout({ step, title, description, children }: StepLayoutProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.topline}><Link to="/" className={styles.backHome}>← Accueil</Link><span>Étape {step} / 03</span></div>
      <div className={styles.progress}><i style={{ width: `${Number(step) * 33.33}%` }} /></div>
      <section className={styles.content}><p className={styles.eyebrow}>Capital / Clair</p><h1>{title}</h1><p className={styles.description}>{description}</p><div className={styles.form}>{children}</div></section>
    </div>
  )
}
