const express = require('express');
const { CLIENT_RENEG_LIMIT } = require('tls');
const app = express();
const port = process.env.PORT || 3000;

//conexion a base de datos
const mongoose = require('mongoose');
const user = "rh"
const password = "42450573"
const dbName = "Viajes"
const uri = `mongodb+srv://${user}:${password}@botviajes.m1qthan.mongodb.net/${dbName}?retryWrites=true&w=majority`;
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