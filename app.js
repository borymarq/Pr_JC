// 1. Seleccionamos el formulario usando su id del HTML
const contactForm = document.getElementById('contact-form');

// 2. Escuchamos el evento cuando el usuario presiona "Enviar"
contactForm.addEventListener('submit', function (event) {
  // Evitamos que la página se recargue automáticamente (comportamiento por defecto)
  event.preventDefault();

  // Obtenemos los valores que el usuario escribió en los campos
  const nameValue = document.getElementById('name').value;
  const emailValue = document.getElementById('email').value;

  // Mostramos un mensaje de confirmación en pantalla
  alert('¡Gracias ' + nameValue + '! Hemos recibido tu correo (' + emailValue + '). Pronto te contactaremos para tu clase demo.');

  // Limpiamos los campos del formulario
  contactForm.reset();
});
