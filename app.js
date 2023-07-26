const express = require('express');
const { CLIENT_RENEG_LIMIT } = require('tls');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

//bodyparser setup
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//para variables de entorno
require('dotenv').config()

//conexion a base de datos
const mongoose = require('mongoose');

const uri = process.env.URIMONGO;
mongoose.connect(uri, 
     { useNewUrlParser: true,
     useUnifiedTopology: true 
   })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

//motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/public'))

//rutas web
app.use('/', require('./router/rutasWeb'))
app.use('/Conductores', require('./router/Conductores'))
// Middleware para manejar rutas desconocidas
app.use((req, res, next) => {
  res.status(404).render("404", {
    titulo: "404",
    descripcion: "Página no encontrada"
  });
});


app.listen(port, () => {
   console.log('servidor a su servicio en el puerto', port)
})