const express = require('express');
const router = express.Router();

const Conductor = require('../models/conductor');

router.get('/Conductores', async(req, res) => {

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


module.exports = router;