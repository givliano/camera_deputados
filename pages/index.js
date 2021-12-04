import Search from '../components/search';

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
    <div>
      <h1>Quanto gastou o deputado?</h1>
      <Search deputies={deputies} />
    </div>
  )
}
