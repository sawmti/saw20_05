// ESTO ES EL MAPEO DE LAS RUTAS ASOCIADOS AL MODELO DE COMENTARIOS (APIS)

const express = require('express');
const app = express();
const Comentarios = require('../models/comentarios');

app.get('', (req, res) => {
  Comentarios.find()
      .exec( (err, comentarios) => {
          if ( err ) {
              return res.status(500).json({
                  ok: false,
                  err
              });
          }
          res.json({
              ok: true,
              comentarios
          });
      });
});
app.get('/byTeamId/:teamId', (req, res) => {
  const TEAMID = req.params.teamId;
  Comentarios.find( { teamId: TEAMID } )
      .exec( (err, comentarios) => {
          if ( err ) {
              return res.status(500).json({
                  ok: false,
                  err
              });
          }
          res.json({
              ok: true,
              comentarios
          });
      });
});
app.post('', (req, res ) => {
  const url = req.protocol + "://" + req.get("host");
  let body = req.body;

  let comentarios = new Comentarios({
      teamId: body.teamId,
      usuario: body.usuario,
      //imgTeam: url + '/images/' + req.files[0].filename,
      comentario: body.comentario,
      fechaCreacion: new Date().toLocaleString(),
      fechaActualizacion: new Date().toLocaleString()
  });

  comentarios.save( (err, comentariosDB) => {
      
      if ( err ) {
          console.log(err)
          return res.status(500).json({
              ok: false,
              err
          });
      }
      res.status(201).json({
          ok: true,
          comentarios: comentariosDB
      });
  });
});
app.put('/:id', (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const ID = req.params.id
  let body = req.body;

  Comentarios.findById( ID, (err, comentariosDB) => {
      if ( err ) {
          return res.status(500).json({
              ok: false,
              err
          });
      }
      if ( !comentariosDB ) {
          return res.status(400).json({
              ok: false,
              err: {
                  message: 'El ID no existe'
              }
          });
      }
      comentariosDB.teamId = body.teamId;
      comentariosDB.usuario = body.imgTeam;
      comentariosDB.comentario = body.teamName;
      comentariosDB.fechaCreacion = new Date().toLocaleString();
      comentariosDB.fechaActualizacion = new Date().toLocaleString();
      comentariosDB.save( (err, comentariosGuardado) => {
          if ( err ) {
              return res.status(500).json({
                  ok: false,
                  err
              });
          }
          res.json({
              ok: true,
              comentarios: comentariosGuardado
          });
      });
  });
  
});
app.delete("/:id", (req, res, next) => {
  try{
    Comentarios.deleteOne({ _id: req.params.id }).then(result => {
          console.log(result);
          res.status(200).json({ message: "Comentario deleted!" });
      });
  }catch(error){
      console.error(error);
  }
});
module.exports = app;