const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Ajusta la ruta de tu conexión a MySQL si es necesario
const userRoutes = require('./routes/userRoutes'); // Asegúrate de tener este archivo de rutas

const app = express();

// 1. Habilitar CORS para permitir peticiones desde el frontend (React en puerto 5173)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// 2. Permitir recibir datos en formato JSON
app.use(express.json());

// 3. Montar las rutas de la API (Ej: /api/users)
app.use('/api/users', userRoutes);

// Ruta de prueba general
app.get('/', (req, res) => {
  res.json({ message: 'Servidor de Edumotion funcionando correctamente 🚀' });
});

// 4. Puerto del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});