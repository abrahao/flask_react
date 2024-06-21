import React, { useState } from 'react';

function Contador() {
  // Declara uma nova variável de estado, chamada "contagem"
  const [contagem, setContagem] = useState(0);

  return (
    <div>
      <p>Você clicou {contagem} vezes</p>
      <button onClick={() => setContagem(contagem + 1)}>
        Clique aqui
      </button>
    </div>
  );
}

export default Contador;
