const express = require('express');
const router = express.Router();

//get all cities
router.get('/first/:n', (req, res)=>{
    const n=req.params.n;
    if(n<=0){
        res.sendStatus(400);
    }
    let result=1;
    for(let i=1; i<=n;i++){
        result *=i;
    }
    
    res.json({
        status: 200,
        result
    });
})

router.post('/second', (req, res)=>{
    let requestString=req.body.msg.toUpperCase();
    requestString=requestString.replace(/ /g, '');
    let counterAlfabet=[];
    let lengthString=requestString.length;
    
    for(let i=0; i<lengthString; i++){
        let indexChar=counterAlfabet.findIndex(element => element.asc === requestString[i]);
        if(indexChar>=0){
            counterAlfabet[indexChar].counter+=1;
        }else{
            counterAlfabet.push({
                asc:requestString[i],
                counter:1,
                indexFirstAppear: i
            })
        }
    }

    //found max
    let max=0;
    let index_max=-1;
    for(let i=0; i<counterAlfabet.length; i++){
        if(counterAlfabet[i].counter > max){
            max=counterAlfabet[i].counter;
            index_max=counterAlfabet[i].indexFirstAppear;
        }
    }

    //find double max
    const maxAlpabetArray=counterAlfabet.filter(element=>element.counter === max);

    let maxAlpabet='';
    if(maxAlpabetArray.length > 1){
        //karena double jadi harus pilih yang awal
        let min=lengthString;
        maxAlpabetArray.forEach(element => {
            if(element.indexFirstAppear < min){
                min=element.indexFirstAppear;
            }
        });
        maxAlpabet=requestString[min]

    }else{
        maxAlpabet=requestString[index_max];
    }
    

    res.json({
        maxAlpabet
    })
})


module.exports = router;