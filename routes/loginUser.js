const { Router } = require('express');
const UserToday29 = require('../models/UserToday29'); // Asegurar que la ruta es correcta
const bcrypt = require('bcrypt');

const router = Router(); // Inicializar el router

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await UserToday29.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'User logged in successfully', user });
    } catch (error) {
        console.error('❌ Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;

