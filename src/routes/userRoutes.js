// src/routes/userRoutes.js
const express = require('express');

// Importa las funciones de controlador para manejar la lógica de registro y inicio de sesión de usuarios
const { registerUser, loginUser } = require('../controllers/userController'); // Desestructuración correcta

// Crea un enrutador Express para definir las rutas de usuario
const router = express.Router();

// Ruta para el registro de usuarios
// Esta ruta maneja las solicitudes POST a '/register'
// Llama a la función registerUser del controlador para procesar el registro
router.post('/register', registerUser);

// Ruta para el inicio de sesión de usuarios
// Esta ruta maneja las solicitudes POST a '/login'
// Llama a la función loginUser del controlador para procesar el inicio de sesión
router.post('/login', loginUser);

// Exporta el enrutador para que se pueda usar en otras partes de la aplicación
module.exports = router;