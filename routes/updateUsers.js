const { Router } = require('express');
const UserToday29 = require('../models/UserToday29'); // Asegurar que la ruta es correcta
const router = Router(); // Inicializar el router

router.put('/update/:id', async (req, res) => {
   try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await UserToday29.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user });
   } catch (error) {
       console.error('❌ Error updating user:', error);
       res.status(500).json({ message: 'Internal server error', error: error.message });
    
   }
})

module.exports = router;