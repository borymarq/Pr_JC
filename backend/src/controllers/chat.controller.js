const procesarMensaje = async (req, res) => {
  try {
    const { mensaje } = req.body;

    if (!mensaje) {
      return res.status(400).json({ error: 'Debes enviar un mensaje para el chatbot' });
    }

    // Aquí se conectará la API real de OpenAI (ChatGPT) más adelante.
    // Por ahora, enviamos una respuesta de prueba para confirmar que la ruta funciona.
    const respuestaIA = `Hola, soy el asistente virtual de AccounTalk. He recibido tu mensaje: "${mensaje}". Pronto estaré conectado a la IA real.`;

    res.status(200).json({ respuesta: respuestaIA });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar el mensaje del chat' });
  }
};

module.exports = { procesarMensaje };
