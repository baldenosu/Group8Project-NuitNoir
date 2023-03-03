// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({ 
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_chavezdo',
    password        : '0368',
    database        : 'cs340_chavezdo'
    // For testing CRUD functions without messing up live database website
    // user            : 'cs340_baldenj',
    // password        : '9205',
    // database        : 'cs340_baldenj'
})

// Export it for use in our applicaiton
module.exports.pool = pool;