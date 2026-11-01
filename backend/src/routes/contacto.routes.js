const express = require('express');
const router = express.Router();
const { crearContacto, obtenerContactos } = require('../controllers/contacto.controller');
const verificarToken = require('../middlewares/auth.middleware');

// Ruta pública para guardar contactos
router.post('/', crearContacto);

// Ruta protegida (solo admin) para ver contactos
router.get('/', verificarToken, obtenerContactos);

module.exports = router;
