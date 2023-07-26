const express = require('express');
const router = express.Router();

const Conductor = require('../models/conductor');

router.get('/', async(req, res) => {

    try {
        
        const arrayConductoresDB = await Conductor.find({})
        console.log(arrayConductoresDB)
        
        
    res.render ("Conductores", {
        arrayConductores: arrayConductoresDB
    })

    } catch (error) {
        console.log(error)
    }


})

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


module.exports = router;