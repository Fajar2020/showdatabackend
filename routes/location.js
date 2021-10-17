const express = require('express');
const router = express.Router();
const cities = require('../helper/city');

//get all cities
router.get('/', (req, res)=>{
    var output={
        status: 200,
        results:cities.cities
    }
    res.json(output);
})

//get single city
router.get('/:id', (req, res)=>{
    const citySelected=cities.cities.filter(city=>city.id === +req.params.id);
    var output={
        status: 200,
        results:citySelected
    }
    res.json(output);
})


module.exports = router;