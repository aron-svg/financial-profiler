import { useNavigate } from 'react-router-dom'
import StepLayout from '../components/StepLayout'
import { useSimulation, type Horizon, type RiskProfile } from '../context/SimulationContext'
import styles from './StepPage.module.css'

const profiles: { name: RiskProfile; description: string }[] = [
  { name: 'Prudente', description: 'Je privilégie la stabilité et la protection du capital.' },
  { name: 'Equilibree', description: 'Je cherche un compromis entre croissance et sérénité.' },
  { name: 'Dynamique', description: "J'accepte les variations pour viser plus de croissance." },
]

export default function Profile() {
  const navigate = useNavigate()
  const { data, update } = useSimulation()
  return (
    <StepLayout step="02" title="Quel est votre cap ?" description="Votre horizon et votre confort face aux variations modifient la lecture des scénarios.">
      <fieldset className={styles.choiceGroup}><legend>Horizon d'investissement</legend><div className={styles.horizonGrid}>{([3, 5, 10, 20] as Horizon[]).map((years) => <button type="button" key={years} className={data.horizon === years ? styles.choiceActive : styles.choice} onClick={() => update({ horizon: years })}><strong>{years}</strong><span>ans</span></button>)}</div></fieldset>
      <fieldset className={styles.choiceGroup}><legend>Votre rapport au risque</legend><div className={styles.profileGrid}>{profiles.map((profile) => <button type="button" key={profile.name} className={data.risk === profile.name ? styles.profileActive : styles.profile} onClick={() => update({ risk: profile.name })}><strong>{profile.name}</strong><span>{profile.description}</span></button>)}</div></fieldset>
      <div className={styles.actions}><button className={styles.back} type="button" onClick={() => navigate('/finances')}>← Retour</button><button className={styles.primary} type="button" onClick={() => navigate('/resultats')}>Voir ma projection <span>→</span></button></div>
    </StepLayout>
  )
}
