import { useState } from 'react';
import TarjetaModulo from './components/TarjetaModulo';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  // Vistas: 'inicio', 'login', 'registro-prueba', 'prueba-activa', 'dashboard'
  const [vistaActual, setVistaActual] = useState('inicio');

  const modulosData = [
    { id: 1, title: "Módulo 1: Accounting Basics", level: "Inicial", desc: "Conceptos de Debit & Credit, estructura del Balance Sheet y terminología básica.", img: "/modulo1.jpg", temas: ["Assets, Liabilities & Equity", "The Accounting Equation", "Journal Entries in English"] },
    { id: 2, title: "Módulo 2: Financial Statements", level: "Intermedio", desc: "Preparación e interpretación de Income Statement y Cash Flow Statement bajo IFRS.", img: "/modulo2.jpg", temas: ["IAS 1: Presentation of Financial Statements", "IAS 2: Inventories Valuation", "Cash Flow Operating Activities"] },
    { id: 3, title: "Módulo 3: Audit & Reporting", level: "Avanzado", desc: "Vocabulario técnico para auditorías externas, papeles de trabajo y notas a los estados.", img: "/modulo3.jpg", temas: ["IFRS 16: Leases Recognition", "IFRS 9: Expected Credit Loss", "External Audit Working Papers"] }
  ];

  // ==========================================
  // ESTADOS DE FORMULARIOS Y SESIÓN
  // ==========================================
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errorForm, setErrorForm] = useState('');
  const [nivelRecomendado, setNivelRecomendado] = useState('Inicial');
  const [moduloActivo, setModuloActivo] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Guarda el prospecto en contactos (envía correo) Y crea su cuenta de usuario en MongoDB
  const registrarCuentaYContacto = async () => {
    try {
      // 1. Registrar contacto / enviar correo automático
      const respContacto = await fetch(`${API_URL}/api/contactos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: nombre, 
          email: correo, 
          mensaje: "Registro de estudiante desde AccounTalk" 
        })
      });
      if (!respContacto.ok) throw new Error('Error al registrar contacto');

      // 2. Crear credenciales de acceso en /api/auth/registrar
      const respAuth = await fetch(`${API_URL}/api/auth/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: correo, 
          password: password 
        })
      });
      if (!respAuth.ok) throw new Error('No se pudo crear la cuenta (es posible que el correo ya exista)');

      return true;
    } catch (error) {
      setErrorForm(`⚠ ${error.message || 'No se pudo conectar con el servidor.'}`);
      return false;
    }
  };

  const iniciarPrueba = async () => {
    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      setErrorForm('⚠ Nombre, correo y contraseña son obligatorios para crear tu cuenta.');
      return;
    }
    const registrado = await registrarCuentaYContacto();
    if (registrado) {
      setErrorForm('');
      setVistaActual('prueba-activa');
    }
  };

  const omitirPrueba = async () => {
    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      setErrorForm('⚠ Ingresa tu nombre, correo y contraseña para crear tu cuenta.');
      return;
    }
    const registrado = await registrarCuentaYContacto();
    if (registrado) {
      setErrorForm('');
      setNivelRecomendado('A elección del estudiante');
      setVistaActual('dashboard');
    }
  };

  // CONEXIÓN EXCLUSIVA DE LOGIN CON /api/auth/login
  const manejarLogin = async (e) => {
    e.preventDefault();
    setErrorForm('');

    if (!correo.trim() || !password.trim()) {
      setErrorForm('⚠ Ingresa tu correo y contraseña.');
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo, password })
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setErrorForm(`⚠ ${data.mensaje || 'Credenciales inválidas'}`);
        return;
      }

      localStorage.setItem('tokenAccounTalk', data.token);
      if (!nombre) setNombre(correo.split('@')[0]);
      setVistaActual('dashboard');
    } catch (error) {
      setErrorForm('⚠ No se pudo conectar con el servidor.');
    }
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
    const nuevoPuntaje = indiceSeleccionado === preguntasNIIF[preguntaActual].respuestaCorrecta ? puntaje + 1 : puntaje;
    setPuntaje(nuevoPuntaje);

    const siguientePregunta = preguntaActual + 1;
    if (siguientePregunta < preguntasNIIF.length) {
      setPreguntaActual(siguientePregunta);
    } else {
      const nivel = nuevoPuntaje === 3 ? "Avanzado" : nuevoPuntaje === 2 ? "Intermedio" : "Inicial";
      setNivelRecomendado(nivel);
      setMostrarResultado(true);
    }
  };

  const reiniciarFlujo = () => {
    localStorage.removeItem('tokenAccounTalk');
    setPreguntaActual(0);
    setPuntaje(0);
    setMostrarResultado(false);
    setErrorForm('');
    setPassword('');
    setModuloActivo(null);
    setVistaActual('inicio');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* 1. BARRA DE NAVEGACIÓN RESPONSIVE */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', padding: '15px 5%', borderBottom: '2px solid #0056b3', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 onClick={reiniciarFlujo} style={{ color: '#0056b3', margin: 0, fontSize: '24px', cursor: 'pointer' }}>
          Accoun<span style={{color: '#ff9900'}}>Talk</span>
        </h2>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span onClick={reiniciarFlujo} style={{ fontWeight: 'bold', cursor: 'pointer', color: '#555' }}>Inicio</span>
          {vistaActual === 'inicio' && (
            <>
              <a href="#proposito" style={{ textDecoration: 'none', color: '#555', fontWeight: 'bold' }}>Propósito</a>
              <a href="#modulos" style={{ textDecoration: 'none', color: '#555', fontWeight: 'bold' }}>Módulos</a>
            </>
          )}
          {vistaActual === 'dashboard' ? (
            <button onClick={reiniciarFlujo} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
              Cerrar Sesión
            </button>
          ) : (
            <button onClick={() => { setErrorForm(''); setPassword(''); setVistaActual('login'); }} style={{ backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>

      <main style={{ flex: 1 }}>
        
        {/* PANTALLA 1: INICIO */}
        {vistaActual === 'inicio' && (
          <>
            <header style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#eef2f5' }}>
              <h1 style={{ color: '#0056b3', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '20px', fontWeight: '900' }}>
                Aprende Contabilidad en Inglés Técnico
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '700px', margin: '0 auto 40px' }}>
                Domina estados financieros bajo estándares IFRS/NIIF y destaca en entrevistas internacionales.
              </p>
              <button onClick={() => { setErrorForm(''); setPassword(''); setVistaActual('registro-prueba'); }} style={{ backgroundColor: '#ff9900', color: '#fff', border: 'none', padding: '15px 35px', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 153, 0, 0.3)' }}>
                Take the Placement Test
              </button>
            </header>

            <section id="proposito" style={{ padding: '70px 20px', textAlign: 'center', backgroundColor: 'white' }}>
              <h2 style={{ color: '#333', marginBottom: '40px', fontSize: '2rem' }}>¿Por qué especializarse?</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: '#f4f8fb', borderRadius: '15px', padding: '35px 25px', width: '100%', maxWidth: '320px', borderTop: '5px solid #0056b3', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📊</div>
                  <h3 style={{ color: '#0056b3', marginBottom: '15px', fontSize: '1.4rem' }}>IFRS & NIIF</h3>
                  <p style={{ color: '#555', lineHeight: '1.6' }}>Manejo preciso de terminología técnica para la elaboración de estados financieros y reportes auditados internacionales.</p>
                </div>

                <div style={{ backgroundColor: '#f4f8fb', borderRadius: '15px', padding: '35px 25px', width: '100%', maxWidth: '320px', borderTop: '5px solid #ff9900', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💬</div>
                  <h3 style={{ color: '#0056b3', marginBottom: '15px', fontSize: '1.4rem' }}>Comunicación Corporativa</h3>
                  <p style={{ color: '#555', lineHeight: '1.6' }}>Preparación estructurada para reuniones ejecutivas, defensa de auditorías y redacción de correos en inglés de negocios.</p>
                </div>
              </div>
            </section>

            <section id="modulos" style={{ padding: '70px 20px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
              <h2 style={{ color: '#0056b3', marginBottom: '40px', fontSize: '2rem' }}>Catálogo de Módulos</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                {modulosData.map((mod) => (
                  <TarjetaModulo 
                    key={mod.id}
                    title={mod.title}
                    level={mod.level}
                    desc={mod.desc}
                    img={mod.img}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {/* PANTALLA 2: CREACIÓN DE CUENTA + ACCESO AL TEST */}
        {vistaActual === 'registro-prueba' && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
            <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', width: '100%', maxWidth: '480px', boxSizing: 'border-box' }}>
              <h2 style={{ color: '#0056b3', marginBottom: '10px', textAlign: 'center', fontSize: '1.8rem' }}>Crea tu Cuenta AccounTalk</h2>
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '25px' }}>Registra tus datos para habilitar tu acceso y comenzar tu evaluación NIIF.</p>
              
              {errorForm && (
                <div style={{ backgroundColor: '#ffe5e5', color: '#d9534f', padding: '12px', borderRadius: '5px', marginBottom: '20px', fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center' }}>
                  {errorForm}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Nombre completo *</label>
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Borys Marquez" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Correo electrónico *</label>
                  <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="correo@ejemplo.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Crea una contraseña *</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1rem' }} />
                </div>
                
                <button onClick={iniciarPrueba} style={{ backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.05rem', cursor: 'pointer', marginTop: '8px' }}>
                  Crear cuenta y empezar Test
                </button>

                <button onClick={omitirPrueba} style={{ backgroundColor: 'transparent', color: '#0056b3', border: '1px solid #0056b3', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' }}>
                  Ya conozco mi nivel, elegir módulo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PANTALLA 3: LA PRUEBA TÉCNICA */}
        {vistaActual === 'prueba-activa' && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '50px 20px' }}>
            <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', width: '100%', maxWidth: '680px', boxSizing: 'border-box' }}>
              {!mostrarResultado ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', color: '#888', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    <span>Technical Assessment</span>
                    <span>Question {preguntaActual + 1} of {preguntasNIIF.length}</span>
                  </div>
                  
                  <h3 style={{ color: '#333', fontSize: '1.35rem', marginBottom: '25px', lineHeight: '1.4' }}>
                    {preguntasNIIF[preguntaActual].pregunta}
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {preguntasNIIF[preguntaActual].opciones.map((opcion, index) => (
                      <button 
                        key={index}
                        onClick={() => manejarRespuesta(index)}
                        style={{ textAlign: 'left', padding: '16px', backgroundColor: '#f8f9fa', border: '2px solid #e9ecef', borderRadius: '10px', cursor: 'pointer', fontSize: '1rem', color: '#444', fontWeight: '500' }}
                      >
                        {opcion}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ color: '#0056b3', marginBottom: '15px', fontSize: '2rem' }}>Assessment Completed!</h2>
                  <p style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#555' }}>Excellent work, <strong>{nombre}</strong>.</p>
                  <p style={{ fontSize: '1.1rem', marginBottom: '25px' }}>Your Score: <strong style={{ fontSize: '1.4rem', color: '#ff9900' }}>{puntaje} / {preguntasNIIF.length}</strong></p>
                  
                  <div style={{ padding: '25px', backgroundColor: '#f4f8fb', borderRadius: '15px', marginBottom: '30px', border: '1px solid #cce5ff' }}>
                    <p style={{ color: '#555', marginBottom: '8px', fontWeight: 'bold' }}>Nivel de Módulo Recomendado:</p>
                    <h3 style={{ margin: 0, color: '#0056b3', fontSize: '1.5rem' }}>
                      {nivelRecomendado}
                    </h3>
                  </div>
                  
                  <button onClick={() => setVistaActual('dashboard')} style={{ backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.05rem', cursor: 'pointer' }}>
                    Continuar al Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PANTALLA 4: LOGIN EXCLUSIVO */}
        {vistaActual === 'login' && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '70px 20px' }}>
            <form onSubmit={manejarLogin} style={{ backgroundColor: 'white', padding: '35px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', boxSizing: 'border-box' }}>
              <h2 style={{ color: '#0056b3', marginBottom: '25px', textAlign: 'center', fontSize: '1.8rem' }}>
                Student Login
              </h2>
              
              {errorForm && (
                <div style={{ backgroundColor: '#ffe5e5', color: '#d9534f', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center' }}>
                  {errorForm}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Email Address:</label>
                  <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="estudiante@espol.edu.ec" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Password:</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '1rem' }} />
                </div>
                <button type="submit" style={{ backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.05rem', cursor: 'pointer', marginTop: '5px' }}>
                  Enter Dashboard
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PANTALLA 5: DASHBOARD DEL ESTUDIANTE */}
        {vistaActual === 'dashboard' && (
          <div style={{ padding: '40px 5%', maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: '6px solid #0056b3' }}>
              <h2 style={{ color: '#0056b3', margin: '0 0 10px 0' }}>Bienvenido a tu Aula Virtual, {nombre || 'Estudiante'} 👋</h2>
              <p style={{ margin: 0, color: '#555' }}>
                Nivel asignado: <strong>{nivelRecomendado}</strong> | Usa el botón azul de la esquina inferior derecha para practicar términos NIIF con el <strong>Tutor IA</strong>.
              </p>
            </div>

            {moduloActivo ? (
              <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <button onClick={() => setModuloActivo(null)} style={{ backgroundColor: '#eef2f5', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}>
                  ← Volver a mis módulos
                </button>
                <h2 style={{ color: '#0056b3' }}>{moduloActivo.title}</h2>
                <p style={{ color: '#666', marginBottom: '20px' }}>{moduloActivo.desc}</p>
                <h4 style={{ color: '#333' }}>Temario técnico del módulo:</h4>
                <ul style={{ lineHeight: '2', color: '#444' }}>
                  {moduloActivo.temas.map((tema, idx) => (
                    <li key={idx}>📘 {tema}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                {modulosData.map((mod) => (
                  <TarjetaModulo 
                    key={mod.id}
                    title={mod.title}
                    level={mod.level}
                    desc={mod.desc}
                    img={mod.img}
                    onSeleccionar={() => setModuloActivo(mod)}
                  />
                ))}
              </div>
            )}
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
          style={{ position: "fixed", bottom: "90px", right: "20px", width: "calc(100vw - 40px)", maxWidth: "380px", height: "520px", border: "none", borderRadius: "15px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 9999 }}
          title="Tutor NIIF"
        />
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: "fixed", bottom: "20px", right: "20px", width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#2563EB", color: "white", border: "none", fontSize: "26px", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", zIndex: 10000, display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {isOpen ? "✕" : "💬"} 
      </button>

    </div>
  );
}

export default App;
