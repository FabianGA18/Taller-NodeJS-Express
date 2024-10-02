const multer = require('multer');
const fs = require('fs');
const express = require('express');
const router = express.Router(); 

// Configuración de almacenamiento de los videos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, 
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('video/')) {
            return cb(new Error('El archivo no es un video'));
        }
        cb(null, true);
    }
});

// Ruta para subir el video
router.post('/upload', upload.single('video'), (req, res) => {
    if (req.file) {
        res.redirect('/gallery');
    } else {
        res.status(400).send('No se subió ningún video');
    }
});

// Ruta para listar los videos
router.get('/videos', (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) return res.status(500).send('Error al leer los archivos');
        res.json(files);
    });
});

module.exports = router;