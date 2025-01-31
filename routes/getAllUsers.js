const { Router } = require('express');
const UserToday29 = require('../models/UserToday29'); // Arreglar la ruta

const router = Router(); // Inicializar el router

// Route to get all users
router.get('/all', async (req, res) => {
    try {
        const users = await UserToday29.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('❌ Error getting users:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;
