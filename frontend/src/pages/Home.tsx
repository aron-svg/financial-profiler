import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Welcome to MyApp</h1>
      <p className={styles.subtitle}>
        A production-ready React + Docker website template. Edit{' '}
        <code>src/pages/Home.tsx</code> to get started.
      </p>
      <div className={styles.actions}>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
          className={styles.btn}
        >
          React Docs
        </a>
        <a
          href="https://vitejs.dev"
          target="_blank"
          rel="noreferrer"
          className={styles.btnOutline}
        >
          Vite Docs
        </a>
      </div>
    </div>
  )
}
