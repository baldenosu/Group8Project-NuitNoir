/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
PORT = 9037;
const path = require('path');
// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.set('views', path.join(__dirname, 'views'));
/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        res.render('index');
    });

app.get('/customers', function(req, res)
    {
        let query1 = "SELECT * FROM Customers;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('customers', {data: rows});
        })
    });

app.get('/employees', function(req, res)
    {
        let query2 = "SELECT * FROM Employees;";
        db.pool.query(query2, function(error, rows, fields){
            res.render('employees', {data: rows});
        })
    });

app.get('/orders', function(req, res)
    {
        res.render('orders');
    });

app.get('/films', function(req, res)
    {
        res.render('films');
    });

app.get('/orders_films', function(req, res)
    {
        res.render('orders_films');
    });

app.get('/customer_levels', function(req, res)
    {
        res.render('customer_levels');
    });

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});


