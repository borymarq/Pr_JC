import { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([
    { remitente: 'ia', texto: '¡Hola! ¿Qué término de contabilidad deseas consultar hoy?' }
  ]);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;

    // Agrega el mensaje del usuario al historial visual
    const nuevoHistorial = [...historial, { remitente: 'usuario', texto: mensaje }];
    setHistorial(nuevoHistorial);
    setMensaje('');

    try {
      // Petición al backend que construiste
      const respuesta = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje })
      });

      const datos = await respuesta.json();

      // Agrega la respuesta de la IA al historial
      setHistorial([...nuevoHistorial, { remitente: 'ia', texto: datos.respuesta }]);
    } catch (error) {
      setHistorial([...nuevoHistorial, { remitente: 'ia', texto: 'Error de conexión con el servidor.' }]);
    }
  };

  return (
    <div className="chatbot-contenedor">
      {abierto && (
        <div className="chatbot-ventana">
          <div className="chatbot-cabecera">
            <h4>Asistente Contable IA</h4>
            <button onClick={() => setAbierto(false)}>X</button>
          </div>
          
          <div className="chatbot-mensajes">
            {historial.map((msg, index) => (
              <div key={index} className={`mensaje ${msg.remitente}`}>
                <p>{msg.texto}</p>
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input 
              type="text" 
              placeholder="Escribe tu consulta..." 
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
            />
            <button onClick={enviarMensaje}>Enviar</button>
          </div>
        </div>
      )}
      <button className="chatbot-boton" onClick={() => setAbierto(!abierto)}>
        💬
      </button>
    </div>
  );
};

export default Chatbot;
