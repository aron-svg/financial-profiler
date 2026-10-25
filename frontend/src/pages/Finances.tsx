import { useNavigate } from 'react-router-dom'
import StepLayout from '../components/StepLayout'
import { useSimulation } from '../context/SimulationContext'
import styles from './StepPage.module.css'

export default function Finances() {
  const navigate = useNavigate()
  const { data, update, monthlySavings, savingsRate } = useSimulation()
  return (
    <StepLayout step="01" title="Commençons par votre quotidien." description="Ces chiffres restent sur votre appareil et servent uniquement à établir votre projection.">
      <div className={styles.formGrid}>
        <label>Revenus nets mensuels <span>€</span><input type="number" min="0" value={data.income} onChange={(event) => update({ income: Number(event.target.value) })} /></label>
        <label>Dépenses fixes <span>€</span><input type="number" min="0" value={data.fixedExpenses} onChange={(event) => update({ fixedExpenses: Number(event.target.value) })} /></label>
        <label>Dépenses variables <span>€</span><input type="number" min="0" value={data.variableExpenses} onChange={(event) => update({ variableExpenses: Number(event.target.value) })} /></label>
      </div>
      <div className={styles.summary}><div><small>Capacité d'épargne</small><strong>{monthlySavings.toLocaleString('fr-FR')} €</strong></div><div><small>Taux d'épargne</small><strong>{(savingsRate * 100).toFixed(0)} %</strong></div><div><small>Reste à vivre</small><strong>{monthlySavings.toLocaleString('fr-FR')} €</strong></div></div>
      <button className={styles.primary} type="button" onClick={() => navigate('/profil')}>Continuer <span>→</span></button>
    </StepLayout>
  )
}
