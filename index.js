const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const createUserRoutes = require('./routes/createUser');
const getAllUsersRoutes = require('./routes/getAllUsers');
const loginUserRoutes = require('./routes/loginUser');
const deleteUserRoutes = require('./routes/deleteUser');
const updateUserRoutes = require('./routes/updateUsers');

dotenv.config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Today29');
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
    }
}

// Rutas
app.use('/api/users', createUserRoutes);
app.use('/api/users', getAllUsersRoutes);
app.use('/api/users', loginUserRoutes);
app.use('/api/users', deleteUserRoutes);
app.use('/api/users', updateUserRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error('❌ Internal Server Error:', err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Iniciar el servidor
async function startServer() {
    await connectToDatabase();
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    });
}

startServer();
