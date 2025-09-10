// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./src/models/userModel'); // Asegúrate de que esta ruta sea correcta

dotenv.config();

const users = [
  {
    username: "john_doe",
    email: "johndoe@example.com",
    password: "Password123!"
  },
  {
    username: "john_smith",
    email: "johnsmith@example.com",
    password: "password123!"
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected...');

    await User.deleteMany(); // Limpiar colección si ya tiene datos

    // Hashear contraseñas antes de insertar
    const hashedUsers = await Promise.all(users.map(async user => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return { ...user, password: hashedPassword };
    }));

    await User.insertMany(hashedUsers);
    console.log('Usuarios insertados con éxito.');
    process.exit();
  } catch (error) {
    console.error('Error insertando usuarios:', error);
    process.exit(1);
  }
};

seedUsers();
