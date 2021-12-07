import { useState, useEffect } from 'react';
import Profile from './profile';
import styles from '../styles/search.module.css';

export default function Search({ deputies }) {
  const [ expenses, setExpenses ] = useState([]);
  const [ selectedDeputy, setSelectedDeputy ] = useState({});

  const handleSubmit = (event) => {
    const deputy = deputies.filter(deputy => deputy.nome == event.target[0].value)[0];
    setSelectedDeputy(deputy);
    event.preventDefault();
  }

  useEffect(() => {
    async function fetchData() {
      if (!selectedDeputy.id) return;
      const data = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${selectedDeputy.id}/despesas`);
      const dataJson = await data.json();

      const lastSixMonthsExpenses = dataJson.dados.reduce((prev, cur) => {
        return prev + cur.valorLiquido;
      }, 0);

      setExpenses(lastSixMonthsExpenses.toFixed(2));
    }

    fetchData();
  }, [selectedDeputy]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Nome do Deputado</label>
          <input list="deputy-names" name="name" type="text"></input>
        </div>
        <datalist id="deputy-names">
          {deputies.map(deputy => (
            <option value={deputy.nome} key={deputy.id} />
          ))}
        </datalist>
        <button>Pesquisar</button>
      </form>
      { selectedDeputy.id ? <Profile {...selectedDeputy} /> : <p>Loading</p> }
      <p>Gastos dos últimos 6 meses: {expenses}</p>
    </div>
  );
}
