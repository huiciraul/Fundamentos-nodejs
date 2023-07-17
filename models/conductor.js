const mongoose = require("mongoose");
const Schema = mongoose.schema;

const conductorSchema = new Schema ({
    nombre: String,
    destino: String,
    origen: String
})

//crear modelo
const conductor = mongoose.model('mascota', mascotaSchema);

module.exports = conductor;
