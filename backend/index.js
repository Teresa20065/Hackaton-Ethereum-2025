const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta visual para ver si corre
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>LlamaPou Backend</title></head>
      <body style="font-family: Arial; text-align: center; margin-top: 50px;">
        <h1>🐾 LlamaPou Backend está corriendo 🦙</h1>
        <p>¡Bienvenido Alex y equipo!</p>
      </body>
    </html>
  `);
});

// API de prueba
app.get("/api", (req, res) => {
  res.json({ message: "LlamaPou backend is running 🦙" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
