import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('Cargando...');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llamada a la API del backend
    axios.get('http://localhost:3001/api/message')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(err => {
        console.error('Error al conectar con el backend:', err);
        setError('No se pudo conectar con el backend');
        setMessage(null);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TP4 DevOps - Frontend</h1>
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="message">
            <h2>Mensaje del Backend:</h2>
            <p>{message}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;