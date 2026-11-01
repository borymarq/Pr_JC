require('dotenv').config();

async function verModelos() {
  try {
    const respuesta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const datos = await respuesta.json();
    
    if (datos.error) {
      return console.error("Error de la API:", datos.error.message);
    }

    console.log("Modelos habilitados para generar texto en tu cuenta:");
    datos.models.forEach(modelo => {
      if (modelo.supportedGenerationMethods.includes('generateContent')) {
        console.log("-", modelo.name.replace('models/', ''));
      }
    });
  } catch (error) {
    console.error("Error de conexión:", error);
  }
}

verModelos();
