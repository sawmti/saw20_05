const express = require('express');
const path = require('path');
const wikidataRoute = require('./Routes/Wikidata');

const app = express()
const root = path.resolve(__dirname, '..')

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

app.use('/api', wikidataRoute)
// Simple REST API that returns some entities
// app.get('/api/entities', (req,res) => 
//  res.send({ entities: 
//    ['Q2887', 
//     'Q33986'
//    ]})
// );

module.exports = app
