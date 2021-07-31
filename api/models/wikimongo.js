const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let wikiMongoSchema = new Schema({

    teamId: {
        type: String,
        unique: true,
        required: [true, 'El Team ID es requerido']
    },
    imgTeam: {
        type: Buffer,
        required: false,
    },
    teamName: {
      type: String,
      required: false,
    },
    imgArr: {
        type: Array,
        required: [true, 'La imagen es requerida']
    },
    inception: {
      type: String,
      required: false,
    },
    officialName: {
      type: String,
      required: false,
    },
    nickname: {
      type: String,
      required: false,
    },
    coachName:{
      type: String,
      required: false,
    },
    league: {
      type: String,
      required: false,
    },
    homeVenue: {
      type: String,
      required: false,
    },
    ownerOf: {
      type: String,
      required: false,
    },
    locLatitude: {
      type: Number,
      required: false,
    },
    locLongitude: {
      type: Number,
      required: false,
    },
    locZoomMap: {
      type: Number,
      required: false,
    },
    webURL: {
      type: String,
      required: false,
    },
    fechaCreacion: {
        type: String,
        required: [true, 'La fecha de creacion es requerida']
    },
    fechaActualizacion: {
        type: String,
        required: [true, 'La fecha de actualizacion es requerida']
    }
})

wikiMongoSchema.plugin( uniqueValidator, {  message: '{PATH} debe ser único' } )

module.exports = mongoose.model( 'WikiMongo', wikiMongoSchema );