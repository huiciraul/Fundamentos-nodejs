const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conductorSchema = new Schema ({
    nombre: String,
    destino: String,
    origen: String
},{collection: 'conductores'});//agrego una especificacion del nombre exacto de mi coleccion porque en ocasiones cuesta ser reconocida, entonces de esta manera me aseguro que lee exactamente esa coleccion

//crear modelo
const Conductor = mongoose.model('Conductor', conductorSchema);

module.exports = Conductor;
