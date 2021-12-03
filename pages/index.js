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

    fetchData();
  }, [url])

  return (
    <div>
      <h1>Hello World</h1>
      <p>{deputies.map(({ nome }) => nome)}</p>
    </div>
  )
}
