const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });

  try {
    const verificado = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.usuario = verificado;
    next(); // La llave es correcta, permite pasar a la ruta
  } catch (error) {
    res.status(400).json({ mensaje: 'Token no válido' });
  }
};

module.exports = verificarToken;
