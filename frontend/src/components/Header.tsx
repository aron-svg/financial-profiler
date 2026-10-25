import { NavLink, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  const location = useLocation()
  const links = [{ to: '/finances', label: 'Simulation' }, { to: '/resultats', label: 'Résultats' }]
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          CAPITAL / CLAIR
        </NavLink>
        <nav className={styles.nav} aria-label="Navigation principale">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={location.pathname === to ? styles.active : styles.link}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
