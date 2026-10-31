const Contacto = require('../models/Contacto');

// 1. Guardar un nuevo contacto (POST)
const crearContacto = async (req, res) => {
  try {
    const { name, email, mensaje } = req.body;

    // Validación básica en servidor
    if (!name || !email) {
      return res.status(400).json({
        mensaje: 'El nombre y el correo son campos obligatorios',
      });
    }

    const nuevoContacto = new Contacto({ name, email, mensaje });
    await nuevoContacto.save();

    res.status(201).json({
      mensaje: 'Contacto registrado exitosamente',
      datos: nuevoContacto,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error interno al guardar el contacto',
      error: error.message,
    });
  }
};

// 2. Obtener la lista de contactos para el panel admin (GET)
const obtenerContactos = async (req, res) => {
  try {
    const contactos = await Contacto.find().sort({ fecha: -1 });
    res.status(200).json(contactos);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al recuperar los contactos',
      error: error.message,
    });
  }
};

module.exports = {
  crearContacto,
  obtenerContactos,
};
