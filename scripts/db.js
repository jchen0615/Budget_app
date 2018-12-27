const test = require('assert');
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'expenses';

// Insert expense into collection "year-month" of MongoDB
function createExpense(year, month, amount, cb) {
  // TODO
  MongoClient.connect(dbUrl, function(err, client) {
    test.equal(null, err);
    const col = client.db(dbName).collection(year.toString() + '-' + month.toString());
    // Insert documents
    col.insertOne({'amount': amount}, {w:1}, function(err, result) {
      test.equal(null, err);
      cb();
      client.close();
    });
  });
}

// Get expenses of collection "year-month" from mongoDB
function getExpenses(year, month, cb) {
  // TODO
  MongoClient.connect(dbUrl, function(err, client) {
    test.equal(null, err);
    const col = client.db(dbName).collection(year.toString() + '-' + month.toString());
    // Insert documents
    col.find().toArray((err, docs) => {
      test.equal(null, err);
      cb(docs);
      client.close();
    });
  });
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
  'createExpense': createExpense,
  'getExpenses': getExpenses
}