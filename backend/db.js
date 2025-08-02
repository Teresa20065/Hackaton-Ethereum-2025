const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error en MongoDB:'));
db.once('open', () => {
  console.log('✅ Conectado a MongoDB');
});

module.exports = mongoose;
