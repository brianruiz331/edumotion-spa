const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getUsers);

// 🌟 NUEVAS RUTAS para Editar y Eliminar
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;