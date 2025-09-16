const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/api/message', (req, res) => {
  res.json({ message: 'Conexión exitosa con el backend!' });
});

// Ruta de estado para verificar que el servidor está funcionando
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Iniciar servidor
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
  });
}

module.exports = app; // Para testing