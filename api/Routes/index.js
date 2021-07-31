const express = require('express');
const app = express();

// Route Wikidata
app.use('/api/wikidata', require('./Wikidata'));

// Route MongoDB
app.use('/api/wikimongo', require('./Wikimongo'));

// Route MongoDB - esta representa el rodenamiento de las rutas
app.use('/api/comentarios', require('./Comentarios'));

module.exports = app;