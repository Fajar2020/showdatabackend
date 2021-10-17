const express = require('express');
const router = express.Router();
const client = require('../helper/conn');
const cities = require('../helper/city');


const tablename='doctors';

//get all doctors
router.get('/', (req, res)=>{
    var query='SELECT * FROM '+tablename+' WHERE 1=1';

    var whereclause='';
    var value=[];
    var counter=0;
    var page = 0;
	var limit = 10;
		
    if (req.query.limit) {
        limit = req.query.limit;
    }

    if (req.query.page) {
        page = (req.query.page - 1) * limit;
    } 

    if (req.query.loc_id) {
        whereclause += ' AND location_id = $' + ++counter;
        value.push(req.query.loc_id);
    }

    // Pakai id udah detail
    if (req.query.id) {
        whereclause += ' AND id = $' + ++counter;
        value.push(req.query.id);
    }


    query += whereclause;

    query += ' OFFSET ' + page;
    query += ' LIMIT ' + limit;
        
    client.query(query, value)
    .then(results => {
        
        if (req.query.id) {
            const locat=getSingleLocation(results.rows[0].location_id);
            if(locat.length){
                results.rows[0].locat=locat[0];
            }
            
        }

        let output={
            status: 200,
            results:results.rows
        }

        res.json(output);
    });
})

//insert post
router.post('/', (req, res)=>{
    client.query("INSERT INTO "+tablename+" (name, description, thumbnail, location_id, price, address) VALUES ($1, $2, $3, $4, $5, $6)", [req.body.name, req.body.description, req.body.thumbnail, req.body.location_id, req.body.price, req.body.address])
    .then(results => {
        let output={
            status: 400,
            msg:""
        }

        if(results.rowCount > 0){
            output.msg='New data has been inserted';
            output.status= 201;
        }else{
            output.msg='fail to add data';
        }
        res.json(output);
    });
})

function getSingleLocation(locationId){
    return cities.cities.filter(city=>city.id===locationId)
}
module.exports = router;