import Search from '../components/search';
import styles from '../styles/index.module.css';

export async function getStaticProps() {
  const data = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados');
  const dataJson = await data.json();

  return {
    props: {
      deputies: dataJson.dados
    }
  }
}

export default function App({ deputies }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quanto gastou o deputado?</h1>
      <h2>Gastos a título da Cota para Exercício da Atividade Parlamentar, a chamada "cota parlamentar".</h2>
      <Search deputies={deputies} />
    </div>
  )
}
