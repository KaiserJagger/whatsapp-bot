const express = require('express');
const { whatsapp } = require('./lib/whatsapp');
const app = express();

const puerto = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.use('/api', require('./routes/links'));

whatsapp.initialize().catch(error => {
  console.error('Failed to initialize WhatsApp client:', error);
  process.exit(1); // Salir si no se puede inicializar el cliente
});

app.listen(puerto, () => {
  console.log(`Server on port ${puerto}`);
});
