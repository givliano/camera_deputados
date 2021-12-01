import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    async function fetchData() {
      const data = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados');
      const dataJson = await data.json();
      console.log(dataJson);
    }

    fetchData();
  }, [])

  return (
    <h1>Hello World</h1>
  )
}
