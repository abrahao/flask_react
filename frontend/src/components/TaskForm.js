import React, { useState } from 'react';
import api from '../api';

function TaskForm({ onTaskAdded }) {
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await api.post('/data', { description });
      if (response.status === 201) {
        onTaskAdded(response.data); // Notifica o componente pai sobre a nova tarefa
        setDescription(''); // Limpa o campo de descrição
      }
    } catch (error) {
      setError('Erro ao enviar a tarefa');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="description">Descrição da Tarefa: </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleChange}
          required
        /> <button type="submit">Adicionar Tarefa</button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
}

export default TaskForm;
