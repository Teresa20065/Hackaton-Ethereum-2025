const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { wallet } = req.body;

  if (!wallet) return res.status(400).json({ error: 'Wallet requerida' });

  try {
    let user = await User.findOne({ wallet });

    if (!user) {
      user = await User.create({ wallet, balance: 0, deposits: [] });
      console.log('🆕 Usuario nuevo creado');
    } else {
      console.log('👤 Usuario ya existe');
    }

    res.json({ message: 'Login exitoso', user });
  } catch (err) {
    res.status(500).json({ error: 'Error de servidor' });
  }
});

module.exports = router;
