// src/components/DataFetcher.js
import React, { useEffect, useState } from 'react';
import api from '../api';

function DataFetcher() {
  const [data, setData] = useState(null); // Estado inicial como null
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  useEffect(() => {
    api.get('/data')
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Erro ao buscar dados');
        setIsLoading(false);
      });
  }, []);
  

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {data && data.message ? <p>{data.message}</p> : <p>Nenhuma mensagem recebida</p>}
    </div>
  );
}

export default DataFetcher;
