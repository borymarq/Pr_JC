// 1. Seleccionamos el formulario usando su id del HTML
const contactForm = document.getElementById('contact-form');

// 2. Escuchamos el evento cuando el usuario presiona "Enviar"
contactForm.addEventListener('submit', function (event) {
  // Evitamos que la página se recargue automáticamente
  event.preventDefault();

  // Obtenemos los valores de los campos
  const nameValue = document.getElementById('name').value.trim();
  const emailValue = document.getElementById('email').value.trim().toLowerCase();

  // 3. Validación básica de formato de correo
  // Verificamos que tenga una '@' y que termine en un dominio conocido
  const tieneArroba = emailValue.includes('@');
  const esDominioValido = 
    emailValue.endsWith('@gmail.com') || 
    emailValue.endsWith('@hotmail.com') || 
    emailValue.endsWith('@outlook.com') || 
    emailValue.endsWith('@yahoo.com') ||
    emailValue.endsWith('.edu.ec'); // Dominio universitario típico

  if (!tieneArroba || !esDominioValido) {
    alert('Error: Por favor ingresa un correo válido (@gmail.com, @hotmail.com, @outlook.com, etc.).');
    return; // El "return" detiene la ejecución; el código de abajo no se ejecuta
  }

  // Si pasó la validación, mostramos el éxito
  alert('¡Gracias ' + nameValue + '! Correo verificado (' + emailValue + '). Pronto te contactaremos.');

  // Limpiamos los campos
  contactForm.reset();
});

// ===============================
// Lógica del Asistente de Consulta
// ===============================

const chatForm = document.getElementById('chat-form');
const userQueryInput = document.getElementById('user-query');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const queryText = userQueryInput.value.trim();
  if (queryText === '') return;

  // 1. Mostrar la pregunta del usuario en pantalla
  const userMessageElement = document.createElement('p');
  userMessageElement.className = 'user-msg';
  userMessageElement.innerHTML = '<strong>Tú:</strong> ' + queryText;
  chatMessages.appendChild(userMessageElement);

  // 2. Limpiar la caja de texto
  userQueryInput.value = '';

  // 3. Simulación de respuesta inmediata (mientras conectamos el backend)
  const botMessageElement = document.createElement('p');
  botMessageElement.className = 'bot-msg';
  botMessageElement.innerHTML = '<strong>Asistente:</strong> Consulta recibida sobre "' + queryText + '". En la siguiente fase responderé conectándome a la API.';
  
  chatMessages.appendChild(botMessageElement);

  // Auto-scroll hacia el último mensaje
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// ===============================
// Lógica de Inicio de Sesión (Login)
// ===============================

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (email === '' || password === '') {
    alert('Por favor completa todos los campos.');
    return;
  }

  // Mensaje simulado de autenticacion mientras conectamos la base de datos
  alert('Intentando conectar con el servidor para autenticar a: ' + email);
  loginForm.reset();
});