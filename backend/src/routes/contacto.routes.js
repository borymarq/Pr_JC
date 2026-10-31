const express = require('express');
const router = express.Router();
const { crearContacto, obtenerContactos } = require('../controllers/contacto.controller');

// Ruta para guardar un contacto: POST /api/contactos
router.post('/', crearContacto);

// Ruta para ver todos los contactos: GET /api/contactos
router.get('/', obtenerContactos);

module.exports = router;
