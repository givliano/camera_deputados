import { useEffect, useState } from 'react';

export default function App() {
  const [ deputies, setDeputies ] = useState([]);

  useEffect(() => {
    async function fetchData(url) {
      const data = await fetch(url);
      const dataJson = await data.json();

      setDeputies((oldData) => [...oldData, ...dataJson.dados]);

      {/* Returned by the API */}
      const hasMorePages = dataJson.links.filter(({ rel }) => rel === 'next');
      hasMorePages.forEach(({ href }) => fetchData(href));
    }

    fetchData('https://dadosabertos.camara.leg.br/api/v2/deputados?itens=100');
  }, [])

  return (
    <div>
      <h1>Hello World</h1>
      <p>{deputies.map(({ nome }) => nome)}</p>
    </div>
  )
}
