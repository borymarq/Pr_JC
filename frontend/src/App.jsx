import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [vistaActual, setVistaActual] = useState('inicio'); // 'inicio', 'login', 'registro-prueba', 'prueba-activa'

  // ==========================================
  // ESTADOS DEL FORMULARIO Y VALIDACIÓN
  // ==========================================
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [errorForm, setErrorForm] = useState('');

  const iniciarPrueba = () => {
    if (!nombre.trim() || !correo.trim()) {
      setErrorForm('⚠ El nombre y el correo son obligatorios para continuar.');
      return;
    }
    setErrorForm(''); // Limpiar errores
    setVistaActual('prueba-activa');
  };

  const omitirPrueba = () => {
    if (!nombre.trim() || !correo.trim()) {
      setErrorForm('⚠ Por favor, ingresa tus datos antes de ir al catálogo.');
      return;
    }
    setErrorForm('');
    // Aquí más adelante lo mandaremos a la base de datos y luego al dashboard
    alert(`¡Perfecto ${nombre}! Te llevaremos directo a elegir tu módulo.`);
    setVistaActual('inicio'); 
  };

  // ==========================================
  // LÓGICA DEL TEST DE NIVELACIÓN (NIIF / IFRS)
  // ==========================================
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const preguntasNIIF = [
    {
      pregunta: "Q1. Under IAS 2, how should inventories be measured?",
      opciones: [
        "A) At historical cost only",
        "B) At the lower of cost and net realizable value (NRV)",
        "C) At fair value less costs to sell",
        "D) At replacement cost"
      ],
      respuestaCorrecta: 1
    },
    {
      pregunta: "Q2. According to IFRS 16, how must a lessee recognize most leases on the balance sheet?",
      opciones: [
        "A) As an off-balance sheet operating lease",
        "B) Only as a lease expense in the income statement",
        "C) By recognizing a right-of-use (ROU) asset and a lease liability",
        "D) As an intangible asset only"
      ],
      respuestaCorrecta: 2
    },
    {
      pregunta: "Q3. What is the impairment model introduced by IFRS 9 for financial assets?",
      opciones: [
        "A) Incurred Loss Model",
        "B) Expected Credit Loss (ECL) Model",
        "C) Fair Value Model",
        "D) Amortized Cost Model"
      ],
      respuestaCorrecta: 1
    }
  ];

  const manejarRespuesta = (indiceSeleccionado) => {
    if (indiceSeleccionado === preguntasNIIF[preguntaActual].respuestaCorrecta) {
      setPuntaje(puntaje + 1);
    }
    const siguientePregunta = preguntaActual + 1;
    if (siguientePregunta < preguntasNIIF.length) {
      setPreguntaActual(siguientePregunta);
    } else {
      setMostrarResultado(true);
    }
  };

  const reiniciarFlujo = () => {
    setPreguntaActual(0);
    setPuntaje(0);
    setMostrarResultado(false);
    setNombre('');
    setCorreo('');
    setErrorForm('');
    setVistaActual('inicio');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* 1. BARRA DE NAVEGACIÓN */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', borderBottom: '2px solid #0056b3', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 onClick={reiniciarFlujo} style={{ color: '#0056b3', margin: 0, fontSize: '24px', cursor: 'pointer' }}>
          Accoun<span style={{color: '#ff9900'}}>Talk</span>
        </h2>
        
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <span onClick={reiniciarFlujo} style={{ fontWeight: 'bold', cursor: 'pointer', color: '#555' }}>Inicio</span>
          {vistaActual === 'inicio' && (
            <>
              <a href="#proposito" style={{ textDecoration: 'none', color: '#555', fontWeight: 'bold' }}>Propósito</a>
              <a href="#modulos" style={{ textDecoration: 'none', color: '#555', fontWeight: 'bold' }}>Módulos</a>
            </>
          )}
          <button onClick={() => setVistaActual('login')} style={{ backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>
            Iniciar Sesión
          </button>
        </div>
      </nav>

      <main style={{ flex: 1 }}>
        
        {/* ========================================== */}
        {/* PANTALLA 1: INICIO Y LANDING PAGE          */}
        {/* ========================================== */}
        {vistaActual === 'inicio' && (
          <>
            {/* HERO SECTION */}
            <header style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: '#eef2f5' }}>
              <h1 style={{ color: '#0056b3', fontSize: '3rem', marginBottom: '20px', fontWeight: '900' }}>Aprende Contabilidad en Inglés Técnico</h1>
              <p style={{ fontSize: '1.3rem', color: '#555', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>Domina estados financieros bajo estándares IFRS/NIIF y destaca en entrevistas internacionales.</p>
              <button onClick={() => setVistaActual('registro-prueba')} style={{ backgroundColor: '#ff9900', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 153, 0, 0.3)' }}>
                Take the Placement Test
              </button>
            </header>

            {/* SECCIÓN RESTAURADA Y MEJORADA: ¿POR QUÉ ESPECIALIZARSE? */}
            <section id="proposito" style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: 'white' }}>
              <h2 style={{ color: '#333', marginBottom: '50px', fontSize: '2.2rem' }}>¿Por qué especializarse?</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
                
                <div style={{ backgroundColor: '#f4f8fb', borderRadius: '15px', padding: '40px 30px', width: '320px', borderTop: '5px solid #0056b3', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📊</div>
                  <h3 style={{ color: '#0056b3', marginBottom: '15px', fontSize: '1.5rem' }}>IFRS & NIIF</h3>
                  <p style={{ color: '#555', lineHeight: '1.6', fontSize: '1rem' }}>Manejo preciso de terminología técnica para la elaboración de estados financieros y reportes auditados internacionales.</p>
                </div>

                <div style={{ backgroundColor: '#f4f8fb', borderRadius: '15px', padding: '40px 30px', width: '320px', borderTop: '5px solid #ff9900', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💬</div>
                  <h3 style={{ color: '#0056b3', marginBottom: '15px', fontSize: '1.5rem' }}>Comunicación Corporativa</h3>
                  <p style={{ color: '#555', lineHeight: '1.6', fontSize: '1rem' }}>Preparación estructurada para reuniones ejecutivas, defensa de auditorías y redacción de correos en inglés de negocios.</p>
                </div>

              </div>
            </section>

            {/* CATÁLOGO DE MÓDULOS CON TEXTOS EXPLICATIVOS RESTAURADOS */}
            <section id="modulos" style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
              <h2 style={{ color: '#0056b3', marginBottom: '50px', fontSize: '2.2rem' }}>Catálogo de Módulos</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                {[
                  { title: "Módulo 1: Accounting Basics", level: "Inicial", desc: "Conceptos de Debit & Credit, estructura del Balance Sheet y terminología básica.", img: "/modulo1.jpg" },
                  { title: "Módulo 2: Financial Statements", level: "Intermedio", desc: "Preparación e interpretación de Income Statement y Cash Flow Statement bajo IFRS.", img: "/modulo2.jpg" },
                  { title: "Módulo 3: Audit & Reporting", level: "Avanzado", desc: "Vocabulario técnico para auditorías externas, papeles de trabajo y notas a los estados.", img: "/modulo3.jpg" }
                ].map((mod, i) => (
                  <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', width: '320px', padding: '25px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                    <div style={{ height: '160px', backgroundColor: '#e9ecef', borderRadius: '8px', marginBottom: '20px', overflow: 'hidden' }}>
                      <img src={mod.img} alt={mod.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                    </div>
                    <h3 style={{ color: '#0056b3', fontSize: '1.3rem', marginBottom: '10px' }}>{mod.title}</h3>
                    <span style={{ display: 'inline-block', backgroundColor: '#eef2f5', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                      Nivel: {mod.level}
                    </span>
                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>{mod.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ========================================== */}
        {/* PANTALLA 2: FORMULARIO PRE-PRUEBA (OBLIGATORIO) */}
        {/* ========================================== */}
        {vistaActual === 'registro-prueba' && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 20px' }}>
            <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', width: '500px' }}>
              <h2 style={{ color: '#0056b3', marginBottom: '10px', textAlign: 'center', fontSize: '2rem' }}>IFRS Placement Test</h2>
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>Ingresa tus datos para comenzar la evaluación técnica en inglés.</p>
              
              {/* Alerta de Error (Solo aparece si dejan los campos vacíos) */}
              {errorForm && (
                <div style={{ backgroundColor: '#ffe5e5', color: '#d9534f', padding: '12px', borderRadius: '5px', marginBottom: '20px', fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center' }}>
                  {errorForm}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Nombre completo *</label>
                  <input 
                    type="text" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Juan Pérez" 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1rem' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Correo universitario / personal *</label>
                  <input 
                    type="email" 
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="correo@ejemplo.com" 
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1rem' }} 
                  />
                </div>
                
                {/* Botón principal para dar la prueba */}
                <button onClick={iniciarPrueba} style={{ backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '10px', transition: '0.2s' }}>
                  Start Assessment
                </button>

                {/* Opción secundaria para los que ya saben su nivel */}
                <button onClick={omitirPrueba} style={{ backgroundColor: 'transparent', color: '#0056b3', border: '1px solid #0056b3', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: '0.2s' }}>
                  Ya conozco mi nivel, elegir módulo
                </button>

              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PANTALLA 3: LA PRUEBA TÉCNICA              */}
        {/* ========================================== */}
        {vistaActual === 'prueba-activa' && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
            <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', width: '700px' }}>
              
              {!mostrarResultado ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', color: '#888', fontWeight: 'bold' }}>
                    <span>Technical Assessment</span>
                    <span>Question {preguntaActual + 1} of {preguntasNIIF.length}</span>
                  </div>
                  
                  <h3 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '30px', lineHeight: '1.4' }}>
                    {preguntasNIIF[preguntaActual].pregunta}
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {preguntasNIIF[preguntaActual].opciones.map((opcion, index) => (
                      <button 
                        key={index}
                        onClick={() => manejarRespuesta(index)}
                        style={{ textAlign: 'left', padding: '18px', backgroundColor: '#f8f9fa', border: '2px solid #e9ecef', borderRadius: '10px', cursor: 'pointer', fontSize: '1.1rem', color: '#444', transition: '0.2s', fontWeight: '500' }}
                        onMouseOver={(e) => { e.target.style.borderColor = '#0056b3'; e.target.style.backgroundColor = '#f4f8fb'; }}
                        onMouseOut={(e) => { e.target.style.borderColor = '#e9ecef'; e.target.style.backgroundColor = '#f8f9fa'; }}
                      >
                        {opcion}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ color: '#0056b3', marginBottom: '20px', fontSize: '2.5rem' }}>Assessment Completed!</h2>
                  <p style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#555' }}>Excellent work, <strong>{nombre}</strong>.</p>
                  <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Your Score: <strong style={{ fontSize: '1.5rem', color: '#ff9900' }}>{puntaje} / {preguntasNIIF.length}</strong></p>
                  
                  <div style={{ padding: '30px', backgroundColor: '#f4f8fb', borderRadius: '15px', marginBottom: '40px', border: '1px solid #cce5ff' }}>
                    <p style={{ color: '#555', marginBottom: '10px', fontWeight: 'bold' }}>Nivel de Módulo Recomendado:</p>
                    <h3 style={{ margin: 0, color: '#0056b3', fontSize: '1.8rem' }}>
                      {puntaje === 3 ? "Avanzado (Audit & Reporting)" : puntaje === 2 ? "Intermedio (Financial Statements)" : "Inicial (Accounting Basics)"}
                    </h3>
                  </div>
                  
                  <button onClick={reiniciarFlujo} style={{ backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '15px 35px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
                    Continuar al Dashboard
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PANTALLA 4: LOGIN                          */}
        {/* ========================================== */}
        {vistaActual === 'login' && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 20px' }}>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', width: '400px' }}>
              <h2 style={{ color: '#0056b3', marginBottom: '30px', textAlign: 'center', fontSize: '2rem' }}>Student Login</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Email Address:</label>
                  <input type="email" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Password:</label>
                  <input type="password" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1rem' }} />
                </div>
                <button style={{ backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '10px' }}>
                  Enter Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#333', color: 'white', textAlign: 'center', padding: '25px', marginTop: 'auto', fontSize: '0.9rem' }}>
        © 2026 AccounTalk. Todos los derechos reservados.
      </footer>

      {/* CHATBOT FLOTANTE GLOBAL (Tutor NIIF) */}
      {isOpen && (
        <iframe 
          src="https://cdn.botpress.cloud/webchat/v3.7/shareable.html?configUrl=https://files.bpcontent.cloud/2026/11/01/03/20261101035119-085XUJWP.json"
          style={{ position: "fixed", bottom: "90px", right: "20px", width: "380px", height: "550px", border: "none", borderRadius: "15px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 9999 }}
          title="Tutor NIIF"
        />
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: "fixed", bottom: "20px", right: "20px", width: "65px", height: "65px", borderRadius: "50%", backgroundColor: "#2563EB", color: "white", border: "none", fontSize: "28px", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", zIndex: 10000, display: "flex", justifyContent: "center", alignItems: "center", transition: '0.2s' }}
      >
        {isOpen ? "✕" : "💬"} 
      </button>

    </div>
  );
}

export default App;
