import React from 'react';

function DataFetcher({ tasks }) {
  return (
    <div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.description}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma tarefa recebida</p>
      )}
    </div>
  );
}

export default DataFetcher;
