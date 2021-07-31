const express = require('express');
const path = require('path');
// conexion de BD
const mongoose = require('mongoose');
const wikidataRoute = require('./Routes/Wikidata');

const app = express()
const root = path.resolve(__dirname, '..')

app.use(express.json({limit: '50mb', extended: true}))
app.use(express.urlencoded({limit: '50mb', extended: true}));


// Log invocations
app.use(function(req, res, next) { console.log(req.url); next(); });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Directly serve static content from /client
app.use(express.static(root + '/client'));

//Configuracion global rutas
app.use(require('./Routes/index'));

// conexion de BD = conectionstring
mongoose.connect("mongodb+srv://admin:h75YfNiysAJrtEui@cluster0.sujbd.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {

    if ( err ) throw err;

    console.log('Base de datos Online')
});

// Simple REST API that returns some entities
// app.get('/api/entities', (req,res) => 
//  res.send({ entities: 
//    ['Q2887', 
//     'Q33986'
//    ]})
// );

module.exports = app
