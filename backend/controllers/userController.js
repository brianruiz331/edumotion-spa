const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = await User.create(name, email, hashedPassword);

            return res.status(201).json({
                success: true,
                message: 'Usuario registrado correctamente',
                data: { id: userId, name, email }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Error al registrar el usuario', error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findByEmail(email);

            if (!user) {
                return res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({
                success: true,
                message: 'Login exitoso',
                session_token: token,
                user: { id: user.id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Error en el servidor al hacer login', error: error.message });
        }
    }
};