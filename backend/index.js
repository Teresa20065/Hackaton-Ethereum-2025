const express = require('express');
const mongoose = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🦙 LlamaPou Backend funcionando correctamente');
});

const loginRoute = require('./routes/login');
app.use('/api/login', loginRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
