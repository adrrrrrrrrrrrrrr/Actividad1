const express = require('express');
const cors = require('cors');
const app = express();

// Importación dinámica
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Configura CORS
app.use(cors({
  origin: 'http://localhost:8100', 
  credentials: true 
}));

app.use(express.json());

app.post('/auth/login', async (req, res) => {
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error en la autenticación' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
