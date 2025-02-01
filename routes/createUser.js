const { Router } = require('express');
const { validationResult } = require('express-validator');
const UserToday29 = require('../models/UserToday29'); // Arreglar la ruta
const bcrypt = require('bcryptjs');


const router = Router(); // Inicializar el router

// Ruta para crear usuario
router.post('/create', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;

        // Verificar si el email ya está en uso
        const existingUser = await UserToday29.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear y guardar el usuario
        const user = new UserToday29({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('❌ Error creating user:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;
