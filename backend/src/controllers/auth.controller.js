const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrar = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({ email, password: passwordEncriptada });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario administrador creado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const passCorrecta = await bcrypt.compare(password, usuario.password);
    if (!passCorrecta) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno' });
  }
};

module.exports = { registrar, login };
