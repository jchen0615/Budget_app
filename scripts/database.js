const mysql = require('mysql');
const path = require('path');
const Promise = require('promise');


var con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database:'budget_data'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("MySql Connected!");
});


function checkTable(year, month){
  
    return new Promise(function(resolve, reject){
      
        var q =  "CREATE TABLE IF NOT EXISTS "+month+year + " (ID INT NOT NULL AUTO_INCREMENT, type VARCHAR(3), value INT, description VARCHAR(100), PRIMARY KEY(ID));";

        con.query(q, function(error, result){
            if(error) throw error;
            resolve(result);
        })
    })
}

// Insert expense into collection "monthYear" of MySql
function createData(year, month, type, value, description) {
  // TODO
    return new Promise(function(resolve, reject){
        var q =  "INSERT INTO "+month+year+" (type, value, description) VALUES ( '" + type + "'," + value + ", '" + description + "');";
       
        con.query(q, function(error, result){
            if(error) throw error;
            resolve(result);
        })    
    })
 
}

function getLatestData(year, month){
    
    return new Promise(function(resolve, reject){
        var q2 = "SELECT * FROM "+month+year+" ORDER BY ID DESC LIMIT 1;";
        
        con.query(q2, function(error, result){
            if(error) throw error;; 
            resolve(new data(result[0].ID, result[0].type, result[0].value, result[0].description));
        })
    
    })
}

//Get data 
function getData(year, month) {
    
    return new Promise(function(resolve, reject){
      
        var q = "SELECT * FROM " +month+year + ";";
    
        con.query(q, function(error, result){
            if(error) throw error;
            result.map(function(element){
                return (new data(element.ID, element.type, element.value, element.description));
            });  
        resolve(result);
        })  
    })
}

function getExpense(year, month){
    
    return new Promise(function(resolve, reject){
      
        var q = "SELECT * FROM " +month+year + " WHERE type = '-';";
    
        con.query(q, function(error, result){
            if(error) throw error;
            result.map(function(element){
                return (new data(element.ID, element.type, element.value, element.description));
            });  
        resolve(result);
        })  
    })
}

function deleteData(year, month, ID){

    return new Promise(function(resolve, reject){
        var q = "DELETE FROM "+month+year+" WHERE ID = "+ID+";";

        con.query(q, function(error, result){
            if(error) throw error;
            console.log(result);
            
            resolve(result);
        })
    })
    
}

function data (id, type, value, description){
    this.id = id;
    this.type = type;
    this.value = value;
    this.description = description;
}

// // Test
// createExpense('2018', '9', 100, () => {
//   MongoClient.connect(dbUrl, function(err, client) {
//     test.equal(null, err);
//     const col = client.db(dbName).collection('2018-9');
//     getExpenses('2018', '9', (docs) => {
//       console.log(docs);
//       // Remove collection
//       col.drop((err, reply) => {
//         test.equal(null, err);
//         console.log('Dropping collection "2018-9"')
//         client.close();
//       });
//     });
//   });
// });


module.exports= {
    'checkTable': checkTable,
    'createData': createData,
    'getData': getData,
    'getLatestData':getLatestData,
    'deleteData':deleteData,
    'getExpense':getExpense
}