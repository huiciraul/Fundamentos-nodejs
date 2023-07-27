const express = require('express'); //en todos estos require, lo que hacemos es solicitar lo que esta en otros modulos que necesitamos en este
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;// como el app.js se vera en el codigo fuente, datos como el puerto que es un dato que se le puede dar un mal uso, lo cargamos atraves de un archivo .env que sera una variable de entorno(es decir un valor que no esta disponible al cliente)

//bodyparser setup
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//para variables de entorno
require('dotenv').config()// este es el require correspondiente para mantener alejadas las variables de entorno del codigo fuente

//conexion a base de datos
const mongoose = require('mongoose');// aca se importa la libreria de mongoose para interactuar con mongodb de node y se usa la uri almacenada en el archivo.env

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