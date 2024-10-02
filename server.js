const express = require('express');
const path = require('path');
const app = express();
const uploadRouter = require('./UploadManagement'); 

// Configuración del servidor
app.use(express.static('public')); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Página de galería 
app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/gallery.html')); 
});

// Usar las rutas de subida de videos
app.use('/', uploadRouter); 

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});