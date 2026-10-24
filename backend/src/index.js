const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'Servidor de AccounTalk funcionando correctamente'
  });
});

// Encender el servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
