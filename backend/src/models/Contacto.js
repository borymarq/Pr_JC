const mongoose = require('mongoose');

// Definimos la estructura del documento
const contactoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      trim: true,
      lowercase: true,
    },
    mensaje: {
      type: String,
      trim: true,
      default: 'Interesado en cursos de contabilidad en inglés',
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

module.exports = mongoose.model('Contacto', contactoSchema);
