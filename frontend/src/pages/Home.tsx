import { useMemo, useState } from 'react'
import styles from './Home.module.css'

type RiskProfile = 'Prudente' | 'Equilibre' | 'Dynamique'
type Scenario = { label: string; rate: number; color: string }

const scenarios: Scenario[] = [
  { label: 'Prudent', rate: 0.02, color: 'var(--color-teal)' },
  { label: 'Central', rate: 0.05, color: 'var(--color-amber)' },
  { label: 'Dynamique', rate: 0.08, color: 'var(--color-coral)' },
]

const allocations: Record<RiskProfile, [string, number][]> = {
  Prudente: [['Fonds en euros', 55], ['Obligations', 30], ['ETF diversifies', 15]],
  Equilibre: [['Fonds en euros', 25], ['Obligations', 25], ['ETF diversifies', 40], ['Actions', 10]],
  Dynamique: [['Obligations', 10], ['ETF diversifies', 45], ['Actions', 45]],
}

function futureValue(monthlyAmount: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 12
  const months = years * 12
  return monthlyRate === 0
    ? monthlyAmount * months
    : monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
}

function formatEuro(value: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
}

export default function Home() {
  const [income, setIncome] = useState(3200)
  const [fixedExpenses, setFixedExpenses] = useState(1400)
  const [variableExpenses, setVariableExpenses] = useState(500)
  const [years, setYears] = useState(10)
  const [risk, setRisk] = useState<RiskProfile>('Equilibre')

  const simulation = useMemo(() => {
    const monthlySavings = Math.max(0, income - fixedExpenses - variableExpenses)
    const savingsRate = income > 0 ? (monthlySavings / income) * 100 : 0
    const values = scenarios.map((scenario) => ({
      ...scenario,
      value: futureValue(monthlySavings, scenario.rate, years),
    }))
    const yearlyPoints = Array.from({ length: years + 1 }, (_, year) => ({
      year,
      value: futureValue(monthlySavings, 0.05, year),
    }))
    return { monthlySavings, savingsRate, values, yearlyPoints }
  }, [income, fixedExpenses, variableExpenses, years])

  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>Pilotage financier personnel</p>
          <h1>Donnez une trajectoire à votre épargne.</h1>
          <p className={styles.lead}>Ajustez vos chiffres, observez les scénarios et construisez une stratégie cohérente avec votre horizon.</p>
        </div>
        <div className={styles.introMark} aria-hidden="true">↗</div>
      </section>

      <section className={styles.dashboard}>
        <form className={styles.panel}>
          <div className={styles.panelHeading}><span className={styles.step}>01</span><div><p className={styles.kicker}>Votre situation</p><h2>Les chiffres du mois</h2></div></div>
          <label>Revenus nets mensuels (€)<input type="number" min="0" value={income} onChange={(event) => setIncome(Number(event.target.value))} /></label>
          <label>Depenses fixes (€)<input type="number" min="0" value={fixedExpenses} onChange={(event) => setFixedExpenses(Number(event.target.value))} /></label>
          <label>Depenses variables (€)<input type="number" min="0" value={variableExpenses} onChange={(event) => setVariableExpenses(Number(event.target.value))} /></label>
          <div className={styles.metricRow}><div><span>Reste a vivre</span><strong>{formatEuro(simulation.monthlySavings)}</strong></div><div><span>Taux d'epargne</span><strong>{simulation.savingsRate.toFixed(0)} %</strong></div></div>
        </form>

        <div className={styles.panel}>
          <div className={styles.panelHeading}><span className={styles.step}>02</span><div><p className={styles.kicker}>Votre projection</p><h2>Choisissez votre cap</h2></div></div>
          <label>Horizon d'investissement <select value={years} onChange={(event) => setYears(Number(event.target.value))}><option value="3">3 ans</option><option value="5">5 ans</option><option value="10">10 ans</option><option value="20">20 ans</option></select></label>
          <fieldset><legend>Profil de risque</legend><div className={styles.segmented}>{(['Prudente', 'Equilibre', 'Dynamique'] as RiskProfile[]).map((profile) => <button type="button" key={profile} className={risk === profile ? styles.selected : ''} onClick={() => setRisk(profile)}>{profile}</button>)}</div></fieldset>
          <p className={styles.helper}>Une projection indicative, avant frais et fiscalite. Elle ne constitue pas un conseil financier.</p>
        </div>
      </section>

      <section className={styles.results}>
        <div className={styles.resultsHeader}><div><p className={styles.eyebrow}>03 · Projection</p><h2>Votre capital potentiel dans {years} ans</h2></div><span className={styles.badge}>{risk}</span></div>
        <div className={styles.scenarioGrid}>{simulation.values.map((scenario) => <article className={styles.scenario} key={scenario.label}><span style={{ color: scenario.color }}>{scenario.label}</span><strong>{formatEuro(scenario.value)}</strong><small>{(scenario.rate * 100).toFixed(0)} % / an</small></article>)}</div>
        <div className={styles.chart} aria-label="Evolution du capital selon le scenario central">{simulation.yearlyPoints.map((point) => <div className={styles.barWrap} key={point.year}><div className={styles.bar} style={{ height: `${Math.max(4, (point.value / Math.max(1, simulation.yearlyPoints[simulation.yearlyPoints.length - 1]?.value ?? 1)) * 100)}%` }} title={`${point.year} an${point.year > 1 ? 's' : ''} : ${formatEuro(point.value)}`} /><span>{point.year}</span></div>)}</div>
      </section>

      <section className={styles.bottomGrid}>
        <div className={styles.panel}><div className={styles.panelHeading}><span className={styles.step}>04</span><div><p className={styles.kicker}>Recommandation indicative</p><h2>Allocation {risk.toLowerCase()}</h2></div></div><div className={styles.allocation}>{allocations[risk].map(([name, percentage]) => <div className={styles.allocationRow} key={name}><span>{name}</span><div className={styles.track}><i style={{ width: `${percentage}%` }} /></div><strong>{percentage} %</strong></div>)}</div></div>
        <aside className={styles.note}><span className={styles.noteIcon}>i</span><h2>Le bon réflexe</h2><p>Constituez d'abord une épargne de précaution de 3 à 6 mois de dépenses avant d'augmenter la part risquée.</p><a href="/about">Comprendre les hypothèses →</a></aside>
      </section>
    </div>
  )
}
