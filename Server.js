const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/my_website', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Conectado a la base de datos'));

// Definir el esquema y modelo de los comentarios
const commentSchema = new mongoose.Schema({
    nombre: String,
    comentario: String,
    fecha: { type: Date, default: Date.now }
});
const Comment = mongoose.model('Comment', commentSchema);

app.use(cors()); // Permite solicitudes de otros dominios
app.use(express.json()); // Permite parsear JSON en las solicitudes

// Ruta para obtener todos los comentarios
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ fecha: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta para guardar un nuevo comentario
app.post('/comments', async (req, res) => {
    const newComment = new Comment({
        nombre: req.body.nombre,
        comentario: req.body.comentario
    });
    try {
        const savedComment = await newComment.save();
        res.json(savedComment);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});