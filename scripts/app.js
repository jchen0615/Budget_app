const express = require('express');
const Promise = require('promise');
const path = require('path');
const app = express();
const port = 3000;
const db = require('./database');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine','ejs');
app.set('views', path.join(__dirname, '../views'));

/*
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
app.use(express.static(__dirname));
*/


app.get('/', (req, res) => {
    //res.sendFile('indedx.html');
    var expense=0, income=0, budget=0, year=req.query.year, month = req.query.month;
    
    cb = function(data){
        data.forEach(element =>{
            if(element.type === "-")
                expense+=element.value;
            else if(element.type === "+")
                income+=element.value;
        })

        res.status(200).send({"expense":expense, "income":income, "budget":(income-expense)});
    };
    
    db.checkTable(year, month)
        .then(function(){
            return db.getData(year,month);
        })
        .then(function(result){
            cb(result);
        })
    
});

app.get('/summary/:year/:month', (req, res) => {
  // TODO: get expense from database
    var expense=0, income=0, year = req.params.year, month=req.params.month;
    
    cb = function(data){
        data.forEach(element =>{
            if(element.type === "-")
                expense+=element.value;
            else if(element.type === "+")
                income+=element.value;
        })

        res.status(200).send({"expense":expense, "income":income, "budget":(income-expense)});
    };
    
    db.getData(year, month).then(function(result){
        cb(result);
    });
  
});

app.get('/summary/:year/:month/data', (req, res) => {
    
    db.getData(req.params.year, req.params.month).then(function(result){
        res.status(200).send(result);
    });
})

app.get('/summary/:year/:month/expenses', (req, res) => {
    
    db.getExpense(req.params.year, req.params.month).then(function(result){
        res.status(200).send(result);
    });
})

app.post('/summary/:year/:month', (req, res) => {
  // TODO: save expense to database
    
    db.createData(req.params.year, req.params.month, req.body.type, req.body.value, req.body.description)
        .then(function(){
           return db.getLatestData(req.params.year, req.params.month);
        })
        .then(function(result){
            res.status(200).send({ID:result.id}); 
    })  
    
});

app.post('/summary/:year/:month/delete', (req, res) =>{
    
    db.deleteData(req.params.year, req.params.month, req.body.ID)
        .then(function(result){
        res.status(200).send(result);
    })
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
