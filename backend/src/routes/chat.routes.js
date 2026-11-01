const express = require('express');
const router = express.Router();
const { procesarMensaje } = require('../controllers/chat.controller');

// Ruta para enviar mensajes al chatbot: POST /api/chat
router.post('/', procesarMensaje);

module.exports = router;
