 // Import MySQL connection.
 var connection;
 //If deploying to Heroku, make sure you set up the JAWSDB add-on.
 if (process.env.JAWSDB_URL) {
     var connection = require("../config/connection.js");
 } else {
     var connection = require("../config/connection.js");
 }

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(table, cb) {
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table + " (" + cols + ") VALUES (" + vals[0] + ");";
    console.log(vals);
    console.log(queryString);
  },
  
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        
        cb(result);
    });
  }
}

// Export the orm object for the model
module.exports = orm;
