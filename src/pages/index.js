import styles from '@/styles/Home.module.css'
import EnviarPDF from '@/components/EnviarPDF'

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <EnviarPDF />
    </main>
  )
}

export function getStaticProps() {
  return {
    props: {},
  }
}
