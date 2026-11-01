const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/auth.controller');

// Ruta para crear el usuario administrador: POST /api/auth/registrar
router.post('/registrar', registrar);

// Ruta para iniciar sesión: POST /api/auth/login
router.post('/login', login);

module.exports = router;
