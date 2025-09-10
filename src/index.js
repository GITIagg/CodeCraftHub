// src/index.js
const dotenv = require('dotenv');
dotenv.config(); // Cargar variables de entorno AL INICIO, siempre primero

const connectDB = require('./config/db');
const createServer = require('./config/server');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler');

const app = createServer();

connectDB(); // Conectar a MongoDB

// Rutas
app.use('/api/users', userRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

