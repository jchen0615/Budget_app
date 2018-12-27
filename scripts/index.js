var express = require('express');
var path = require('path');
var $ = require("jquery");


var app = express();

const port = 3001;

const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
})

const publicPath = path.join(__dirname, '../public');
app.use(express.static(__dirname));
app.use(express.static(publicPath));

app.set('view engine','ejs');
app.set('views', path.join(__dirname, '../views'));

/*
var initialization = function(){
    
    var date = new Date();
    var year = date.getFullYear();
    
    $(document).ready(function(){
         $("year").text() =year; 
        
    });
   
    
    
};
*/


app.get('/summary/:year/:month', (req, res)=>{
    res.render('month',{Month:req.params.month, Year:req.params.year});
})