import { useEffect, useState } from 'react';

export default function App() {
  const [ deputies, setDeputies ] = useState([]);
  const [ url, setUrl ] = useState('https://dadosabertos.camara.leg.br/api/v2/deputados?itens=100');

  useEffect(() => {
    console.log(url)
    async function fetchData() {
      const data = await fetch(url);
      const dataJson = await data.json();

      setDeputies((oldData) => [...oldData, ...dataJson.dados]);

      {/* Returned by the API */}
      const hasMorePages = dataJson.links.filter(({ rel }) => rel === 'next');
      hasMorePages.forEach(({ href }) => setUrl(href));
    }

    // fetchData('https://dadosabertos.camara.leg.br/api/v2/deputados?itens=100');
    fetchData();
  }, [url])

  return (
    <div>
      <h1>Hello World</h1>
      <p>{deputies.map(({ nome }) => nome)}</p>
    </div>
  )
}
