const Contacto = require('../models/Contacto');
const nodemailer = require('nodemailer');

// Configuración del transportador de correo (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Contraseña de aplicación de Google (16 letras)
  },
});

// 1. Guardar un nuevo contacto y enviar correo automático (POST)
const crearContacto = async (req, res) => {
  try {
    const { name, email, mensaje } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        mensaje: 'El nombre y el correo son campos obligatorios',
      });
    }

    const nuevoContacto = new Contacto({ name, email, mensaje });
    await nuevoContacto.save();

    // Intentar enviar correo automático si están configuradas las credenciales en .env
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: `"AccounTalk ESPOL" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Bienvenido a AccounTalk - Información de Módulos NIIF/IFRS',
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
              <h2 style="color: #0056b3;">¡Hola, ${name}!</h2>
              <p>Gracias por realizar tu registro en <strong>AccounTalk</strong>.</p>
              <p>Aquí tienes la información de nuestros programas de Contabilidad en Inglés Técnico:</p>
              <ul>
                <li><strong>Módulo 1 (Inicial - Accounting Basics):</strong> $45 USD</li>
                <li><strong>Módulo 2 (Intermedio - Financial Statements IFRS):</strong> $60 USD</li>
                <li><strong>Módulo 3 (Avanzado - Audit & Reporting):</strong> $75 USD</li>
                <li><strong>Paquete Completo (3 Módulos):</strong> $150 USD (Ahorro de $30)</li>
              </ul>
              <p>Una vez confirmado tu pago, recibirás tus credenciales de acceso al Aula Virtual.</p>
              <p style="color: #777; font-size: 12px;">Equipo AccounTalk</p>
            </div>
          `,
        });
      } catch (mailError) {
        console.error('Aviso: Se guardó en DB, pero falló el envío de correo:', mailError.message);
      }
    }

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

// 2. Obtener la lista de contactos (GET)
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
