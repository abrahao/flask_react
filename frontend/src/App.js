import React, { useState, useEffect } from 'react';
import './App.css';
import DataFetcher from './components/DataFetcher';
import TaskForm from './components/TaskForm';
import api from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // Função para buscar as tarefas ao montar o componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/data');
        setTasks(response.data.message); // Atualiza as tarefas com os dados do backend
      } catch (error) {
        setError('Erro ao buscar tarefas');
      }
    };

    fetchTasks();
  }, []);

  // Função para adicionar uma nova tarefa à lista de tarefas
  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]); // Adiciona a nova tarefa ao estado
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Tasks</h1>

        {/* Formulário para adicionar nova tarefa */}
        <TaskForm onTaskAdded={handleTaskAdded} />

        {/* Componente que exibe as tarefas */}
        {error && <p>{error}</p>}
        <DataFetcher tasks={tasks} />
      </header>
    </div>
  );
}

export default App;
