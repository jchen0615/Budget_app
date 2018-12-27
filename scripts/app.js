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
    var expense=0, income=0, budget=0, year=req.query.year, month = req.query.month;
    
    //Takes in an array and sums the income/expense using the type provided by the array element
    cb = function(data){
        data.forEach(element =>{
            if(element.type === "-")
                expense+=element.value;
            else if(element.type === "+")
                income+=element.value;
        })
        res.status(200).send({"expense":expense, "income":income, "budget":(income-expense)});
    };
    
    //Checks if table exist then retrieve the data for that month/year
    db.checkTable(year, month)
        .then(function(){
            return db.getData(year,month);
        })
        .then(function(result){
            cb(result);
        })
    
});

app.get('/summary/:year/:month', (req, res) => {
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

//get request to get detailed data for specified month/year
app.get('/summary/:year/:month/data', (req, res) => {
    
    db.getData(req.params.year, req.params.month).then(function(result){
        res.status(200).send(result);
    });
})

//get request to get detailed expense data for specified month/year
app.get('/summary/:year/:month/expenses', (req, res) => {
    
    db.getExpense(req.params.year, req.params.month).then(function(result){
        res.status(200).send(result);
    });
})

//post request to post new data(income/expense) to MySQL
app.post('/summary/:year/:month', (req, res) => {
    db.createData(req.params.year, req.params.month, req.body.type, req.body.value, req.body.description)
        .then(function(){
           return db.getLatestData(req.params.year, req.params.month);
        })
        .then(function(result){
            res.status(200).send({ID:result.id}); 
    })  
    
});

//post request to delete item by ID from MySQL
app.post('/summary/:year/:month/delete', (req, res) =>{
    db.deleteData(req.params.year, req.params.month, req.body.ID)
        .then(function(result){
        res.status(200).send(result);
    })
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
