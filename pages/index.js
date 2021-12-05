import Search from '../components/search';
import styles from './index.module.css';

export async function getStaticProps() {
  const data = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados');
  const dataJson = await data.json();

  return {
    props: {
      deputies: dataJson.dados
    }
  }
}

export default function App({ deputies, allDeputiesNames }) {
  return (
    <div className={styles.container}>
      <h1>Quanto gastou o deputado?</h1>
      <Search deputies={deputies} />
    </div>
  )
}
