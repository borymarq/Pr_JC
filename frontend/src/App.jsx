import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Nueva versión de AccounTalk</h1>
      
      {/* 1. La ventana del chat (solo se muestra si isOpen es true) */}
      {isOpen && (
        <iframe 
          src="https://cdn.botpress.cloud/webchat/v3.7/shareable.html?configUrl=https://files.bpcontent.cloud/2026/11/01/03/20261101035119-085XUJWP.json"
          style={{
            position: "fixed",
            bottom: "90px", // Flota por encima del botón
            right: "20px",
            width: "380px",
            height: "550px",
            border: "none",
            borderRadius: "15px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 9999
          }}
          title="AccounTalk Assistant"
        />
      )}

      {/* 2. El botón flotante en la esquina */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#2563EB", // Azul profesional
          color: "white",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 10000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {isOpen ? "✕" : "💬"} 
      </button>
    </div>
  );
}

export default App;
