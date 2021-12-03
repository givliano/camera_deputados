import { useEffect, useState } from 'react';

export async function getStaticProps() {
  const data = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados');
  const dataJson = await data.json();
  const allDeputiesNames = dataJson.dados.map(deputy => deputy.nome)

  return {
    props: {
      deputies: dataJson.dados,
      allDeputiesNames
    }
  }
}

export default function App({ deputies, allDeputiesNames }) {
  const [ expenses, setExpenses ] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados/92346/despesas');
      const dataJson = await data.json();

      const lastSixMonthsExpenses = dataJson.dados.reduce((prev, cur) => {
        return prev + cur.valorLiquido
      }, 0);

      setExpenses(lastSixMonthsExpenses);
    }

    fetchData();
  }, []);


  // const totalSpent = expenses.reduce((prev, curr) => prev.valorLiquido + curr.valorLiquido, 0);

  return (
    <div>
      <h1>Quanto gastou o deputado?</h1>
      <form>
        <label htmlFor="name">Nome do Deputado</label>
        <input name="name" type="text"></input>
      </form>
      <p>{expenses}</p>
      {/* <p>{deputies.map(({ nome }) => nome)}</p> */}
    </div>
  )
}
