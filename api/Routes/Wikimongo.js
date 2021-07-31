const express = require('express');
const multer = require('multer');

const app = express();
const WikiMongo = require('../models/wikimongo');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const url = req.get('host');
      let repository = "";

      if ( url == 'localhost:3000')
      {
          repository = "api/images"
      } else {
          repository = "images"
      }

      const isValid  = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if(isValid){
          error = null;
      }
      cb(error, repository);
  },
  filename: (req, file, cb) =>{
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext)
  }
});

app.get('', (req, res) => {

  WikiMongo.find()
      .exec( (err, wikiMongos) => {

          if ( err ) {
              return res.status(500).json({
                  ok: false,
                  err
              });
          }

          res.json({
              ok: true,
              wikiMongos
          });
      });
});

app.get('/byTeamId/:teamId', (req, res) => {

  const TEAMID = req.params.teamId;

  WikiMongo.find( { teamId: TEAMID } )
      .exec( (err, wikiMongo) => {

          if ( err ) {
              return res.status(500).json({
                  ok: false,
                  err
              });
          }

          res.json({
              ok: true,
              wikiMongo
          });
      });
});

app.post('', multer({storage: storage}).any(), (req, res ) => {

  const url = req.protocol + "://" + req.get("host");
  let body = req.body;


  let wikiMongo = new WikiMongo({
      teamId: body.teamId,
      //imgTeam: url + '/images/' + req.files[0].filename,
      imgTeam: body.imgTeam,
      teamName: body.teamName,
      inception: body.inception,
      officialName: body.officialName,
      nickname: body.nickname,
      coachName: body.coachName,
      league: body.league,
      homeVenue: body.homeVenue,
      ownerOf: body.ownerOf,
      locLatitude: body.locLatitude,
      locLongitude: body.locLongitude,
      locZoomMap: body.locZoomMap,
      webURL: body.webURL,
      fechaCreacion: new Date().toLocaleString(),
      fechaActualizacion: new Date().toLocaleString()
  });

  console.log(wikiMongo)

  wikiMongo.save( (err, wikiMongoDB) => {
      
      if ( err ) {

          console.log(err)
          return res.status(500).json({
              ok: false,
              err
          });
      }

      res.status(201).json({
          ok: true,
          wikiMongo: wikiMongoDB
      });
  });
});

app.put('/:id', multer({storage: storage}).any(), (req, res) => {

  const url = req.protocol + "://" + req.get("host");
  const ID = req.params.id
  let body = req.body;


  WikiMongo.findById( ID, (err, wikiMongoDB) => {

      if ( err ) {
          return res.status(500).json({
              ok: false,
              err
          });
      }

      if ( !wikiMongoDB ) {
          return res.status(400).json({
              ok: false,
              err: {
                  message: 'El ID no existe'
              }
          });
      }

      wikiMongoDB.teamId = body.teamId;
      wikiMongoDB.imgTeam = body.imgTeam;
      //wikiMongoDB.imgTeam = url + '/images/' + body.imgTeam[0].filename;
      wikiMongoDB.teamName = body.teamName;
      wikiMongoDB.inception = body.inception;
      wikiMongoDB.officialName = body.officialName;
      wikiMongoDB.nickname = body.nickname;
      wikiMongoDB.coachName = body.coachName;
      wikiMongoDB.league = body.league;
      wikiMongoDB.homeVenue = body.homeVenue;
      wikiMongoDB.ownerOf = body.ownerOf;
      wikiMongoDB.locLatitude = body.locLatitude;
      wikiMongoDB.locLongitude = body.locLongitude;
      wikiMongoDB.locZoomMap = body.locZoomMap;
      wikiMongoDB.webURL = body.webURL;
      wikiMongoDB.fechaCreacion = new Date().toLocaleString();
      wikiMongoDB.fechaActualizacion = new Date().toLocaleString();

      wikiMongoDB.save( (err, wikiMongoGuardado) => {

          if ( err ) {
              return res.status(500).json({
                  ok: false,
                  err
              });
          }

          res.json({
              ok: true,
              wikiMongo: wikiMongoGuardado
          });
      });
  });
  
});

app.delete("/:id", (req, res, next) => {
    try{
        WikiMongo.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json({ message: "Comentario deleted!" });
        });
    }catch(error){
        console.error(error);
    }
});

module.exports = app;