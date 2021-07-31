// este es nuestro moddelo - como en .net es nuestra identidad.

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let comentariosSchema = new Schema({
    teamId: {
        type: String,
        required: [true, 'El Team ID es requerido']
    },
    usuario: {
        type: String,
        required: false,
    },
    comentario: {
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
module.exports = mongoose.model( 'Comentarios', comentariosSchema );

