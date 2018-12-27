var express = require('express');
var path = require('path');
var $ = require("jquery");


var app = express();
const port = 3001;

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

//get request to render the month.ejs file
app.get('/summary/:year/:month', (req, res)=>{
    res.render('month',{Month:req.params.month, Year:req.params.year});
})