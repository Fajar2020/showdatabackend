const Client = require('pg').Client;
const client = new Client({
    user:'postgres',    //db username
    password:'1234',//db password
    port:5432,  //commont port for pg
    database:'test' //db name
})


client.connect()
    .then(()=>console.log('connect to pg'))
    .catch(e=>console.log(e));

module.exports=client;