const express = require('express');
const router = express.Router();

router.get('/', (rq, res) => {
    res.render ("Conductores", { 
        arrayConductores: [
            {id: '64b5b0d0f7deb4c45212e9dc',nombre:"Raul",destino:"Corrientes",origen:"Santa Lucia"}
        ]
    })
})












module.exports = router;