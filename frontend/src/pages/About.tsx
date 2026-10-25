import styles from './About.module.css'

export default function About() {
  return (
    <div className={styles.page}>
      <h1>About</h1>
      <p>
        This is a GitHub template project for a React website served with Nginx
        inside Docker. Replace this page with your own content.
      </p>
    </div>
  )
}
