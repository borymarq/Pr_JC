const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Conexión a MongoDB Atlas
conectarDB();

// 2. Middlewares globales
app.use(cors());
app.use(express.json());

// 3. Rutas de la API
app.get('/', (req, res) => {
  res.status(200).json({ mensaje: 'Servidor de AccounTalk funcionando correctamente' });
});

app.use('/api/contactos', require('./routes/contacto.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

// 4. Encendido del servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
