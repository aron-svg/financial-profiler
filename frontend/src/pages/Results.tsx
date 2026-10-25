import { Link } from 'react-router-dom'
import { useSimulation } from '../context/SimulationContext'
import styles from './Results.module.css'

function futureValue(monthlyAmount: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 12
  const months = years * 12
  return monthlyRate === 0 ? monthlyAmount * months : monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
}

function euro(value: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
}

export default function Results() {
  const { data, monthlySavings, savingsRate, reset } = useSimulation()
  const rates = [{ name: 'Prudent', rate: 0.02, color: '#8faaa4' }, { name: 'Central', rate: 0.05, color: '#e7b75f' }, { name: 'Dynamique', rate: 0.08, color: '#ed765e' }]
  const points = rates.map((scenario) => Array.from({ length: data.horizon + 1 }, (_, year) => ({ year, value: futureValue(monthlySavings, scenario.rate, year) })))
  const centralPoints = points[1] ?? []
  const maxValue = points[2]?.[points[2].length - 1]?.value || 1
  const allocations = data.risk === 'Prudente' ? [['Fonds en euros', 55], ['Obligations', 30], ['ETF diversifiés', 15]] : data.risk === 'Dynamique' ? [['Obligations', 10], ['ETF diversifiés', 45], ['Actions', 45]] : [['Fonds en euros', 25], ['Obligations', 25], ['ETF diversifiés', 40], ['Actions', 10]]

  return (
    <div className={styles.page}>
      <header className={styles.header}><div><p className={styles.eyebrow}>Votre projection · {data.risk}</p><h1>Voici votre trajectoire.</h1><p>Avec {monthlySavings.toLocaleString('fr-FR')} € investis chaque mois pendant {data.horizon} ans.</p></div><Link to="/profil" className={styles.edit}>Modifier les hypothèses</Link></header>
      <section className={styles.heroResult}><div><span>Capital central estimé</span><strong>{euro(futureValue(monthlySavings, 0.05, data.horizon))}</strong><small>à {data.horizon} ans · scénario médian à 5 %</small></div><div className={styles.rate}><span>Taux d'épargne</span><strong>{(savingsRate * 100).toFixed(0)} %</strong></div></section>
      <section className={styles.graphPanel}><div className={styles.sectionTitle}><div><p className={styles.eyebrow}>Scénarios de rendement</p><h2>Trois futurs possibles</h2></div><span>Capital en €</span></div><div className={styles.chart}><div className={styles.yAxis}><span>{euro(maxValue)}</span><span>{euro(maxValue / 2)}</span><span>0 €</span></div><svg viewBox="0 0 800 260" role="img" aria-label="Graphique des projections de capital"><line x1="0" y1="250" x2="800" y2="250" /><line x1="0" y1="125" x2="800" y2="125" />{rates.map((scenario, index) => <polyline key={scenario.name} fill="none" stroke={scenario.color} strokeWidth="4" points={(points[index] ?? []).map((point) => `${(point.year / data.horizon) * 780 + 10},${250 - (point.value / maxValue) * 220}`).join(' ')} style={{ opacity: scenario.rate === 0.05 ? 1 : .5 }} />)}</svg></div><div className={styles.xAxis}>{centralPoints.map((point) => <span key={point.year}>{point.year} an{point.year > 1 ? 's' : ''}</span>)}</div><div className={styles.legend}>{rates.map((scenario) => <span key={scenario.name}><i style={{ background: scenario.color }} />{scenario.name} · {(scenario.rate * 100).toFixed(0)} %</span>)}</div></section>
      <section className={styles.bottom}><div className={styles.graphPanel}><div className={styles.sectionTitle}><div><p className={styles.eyebrow}>Répartition proposée</p><h2>Une base pour démarrer</h2></div></div><div className={styles.allocations}>{allocations.map(([name, percentage]) => <div className={styles.allocation} key={name}><div><span>{name}</span><strong>{percentage} %</strong></div><div className={styles.track}><i style={{ width: `${percentage}%` }} /></div></div>)}</div></div><aside className={styles.disclaimer}><span>NOTE</span><h2>Un outil pour réfléchir.</h2><p>Ces projections sont indicatives et ne tiennent pas compte des frais, de l'inflation ou de la fiscalité. Elles ne constituent pas un conseil en investissement.</p><button type="button" onClick={reset}>Recommencer</button></aside></section>
    </div>
  )
}
