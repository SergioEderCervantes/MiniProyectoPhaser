

// Creacion del server para el proyecto 

const port = 3000;
const express = require('express');
const app = express();

// Configuracion de la ruta src
app.use(express.static(__dirname + '/src'));

// Configuracion de la ruta node_modules
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Configuracion de la ruta de los assets
app.use('/assets', express.static(__dirname + '/assets'));

app.listen(port, () => {
    console.log("Servidor ejecutandose en: http://localhost:" + port);
});