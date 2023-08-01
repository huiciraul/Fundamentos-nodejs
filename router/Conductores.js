const express = require('express');
const router = express.Router();

const Conductor = require('../models/conductor');


router.get('/', async (req, res) => {
    try {
      const nombre = req.query.nombre || ''; // Si el parámetro "nombre" no está presente, se establece una cadena vacía por defecto
      let arrayConductoresDB;
  
      if (nombre.trim() === '') {
        arrayConductoresDB = await Conductor.find({});
      } else {
        arrayConductoresDB = await Conductor.find({ nombre: { $regex: nombre, $options: 'i' } });
      }
  
      res.render('Conductores', {
        error: false,
        arrayConductores: arrayConductoresDB,
        nombre: nombre, // Pasamos el valor del nombre ingresado para mantenerlo en el campo de búsqueda
      });
    } catch (error) {
      console.log(error);
      res.render('Conductores', {
        error: true,
        mensaje: 'ocurrio un error',
        arrayConductores: [],
        nombre: '', // Si ocurre un error, establecemos una cadena vacía para el campo de búsqueda
      });
    }
  });

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const conductorDB = new Conductor(body)
        await conductorDB.save()
        console.log('conductor agregado', conductorDB)
        res.redirect('/Conductores')
    } catch (error) {
        console.log(error)
    }
})
router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const conductorDB = await Conductor.findOne({_id: id})
        console.log(conductorDB);

        res.render('detalle', {
           conductor : conductorDB,
           error: false
        })

    } catch (error) {
        console.log(error)
        res.render('detalle', {
            error: true,
            mensaje: 'no se encuentra el id seleccionado'
         })
    }
})

router.delete('/:id', async (req,res) => {
  const id = req.params.id
  try {
    const conductorDB = await Conductor.findByIdAndDelete({_id: id})
    if (conductorDB) {
      res.json({
        estado: true,
        mensaje: 'eliminado'
      })
    } else {
      res.json({
        estado: false,
        mensaje: 'error al eliminar'
      })
    }
  } catch (error) {
    console.log(error)
    
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  try {
    const conductorDB = await Conductor.findByIdAndUpdate(id, body, {useFindAndModify: false})
    console.log(conductorDB)
    console.log(req.body)
    res.json({
      estado:true,
      mensaje: 'editado'
    })
  } catch (error) {
    res.json({
      estado: false,
      mensaje: 'error, no se pudo editar'
    })
  }

})
module.exports = router;