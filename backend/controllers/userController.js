const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    // 1. Registro de usuarios
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            
            if (!name || !email || !password) {
                return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
            }

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

    // 2. Inicio de sesión
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

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secreto_super_seguro', { expiresIn: '1h' });

            return res.status(200).json({
                success: true,
                message: 'Login exitoso',
                session_token: token,
                user: { 
                    id: user.id, 
                    name: user.name, 
                    email: user.email, 
                    role: user.role || 'user' 
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Error en el servidor al hacer login', error: error.message });
        }
    },

    // 3. Obtener todos los usuarios
    async getUsers(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Error al obtener los usuarios', error: error.message });
        }
    }, // <-- ¡IMPORTANTE: Esta coma separaba las funciones!

    // 4. Actualizar usuario
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            
            const affectedRows = await User.update(id, name, email);
            if (affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            return res.status(200).json({ success: true, message: 'Usuario actualizado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Error al actualizar el usuario', error: error.message });
        }
    }, // <-- ¡IMPORTANTE: Esta coma también!

    // 5. Eliminar usuario
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const affectedRows = await User.delete(id);
            
            if (affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            return res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Error al eliminar el usuario', error: error.message });
        }
    }
};