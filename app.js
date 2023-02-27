/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
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
        let query1;
        if (req.query.customer_name === undefined)
        {
            query1 = `SELECT * FROM Customers;`;
        }
        else
        {
            query1 = `SELECT * FROM Customers WHERE customer_name LIKE  "$req.query.customer_name}%"`
        }
        let query2 = `SELECT * FROM Customer_Levels;`;
        db.pool.query(query1, function(error, rows, fields){
            let customers = rows;
            db.pool.query(query2, (error, rows, fields) => {
                let customer_levels = rows;
                let customerLevelMap = {}
                customer_levels.map(customerLevel => {
                    let customerLevelId = parseInt(customerLevel.customer_level_id, 10);
                    customerLevelMap[customerLevelId] = customer_levels["level_name"]
                    // console.log("customerLevelId: ", customerLevelId)
                    // console.log("customerLevelMap: ", customerLevelMap)
                    // console.log("customerLevel: ", customerLevel)
                    // console.log("customer_levels: ", customer_levels)
                })
                // customer = customers.map(person => {
                //     return Object.assign(person, {customer_level_id: customerLevelMap[customer_levels.customer_level_id]})
                // })
                // console.log(customers)

                return res.render('customers', {data: customers, customer_level: customer_levels});
            })
        })
    });

app.post('/add-customer-ajax', function(req, res)
{
    let data = req.body;
    let customer_level_id = parseInt(data.customer_level_id)
    if (isNaN(customer_level_id))
    {
        customer_level_id = "NULL"
    }

    query1 = `INSERT INTO Customers (customer_name, customer_address, customer_email, customer_level_id) VALUES ('${data.customer_name}', '${data.customer_address}', '${data.customer_email}', ${customer_level_id})`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/put-customer-ajax', function(req, res, next){
    let data = req.body;
  
    let customerLevel = parseInt(data.customer_level);
    let customerName = parseInt(data.customer_name);
  
    let queryUpdateCustomerLevel = `UPDATE Customers SET customer_level_id = ? WHERE customer_id = ?`;
    let selectCustomerLevel = `SELECT * FROM Customer_Levels WHERE customer_level_id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateCustomerLevel, [customerLevel, customerName], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectCustomerLevel, [customerLevel], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.customer_id);
    let deleteNNCustomer = `DELETE FROM Customers WHERE customer_id = ?`;
    let deleteNNOrder = `DELETE FROM Orders WHERE customer_id = ?`;

        db.pool.query(deleteNNOrder, [customerID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else
            {
                db.pool.query(deleteNNCustomer, [customerID], function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    }
                    else
                    {
                        res.sendStatus(204);
                    }
                })
            }
        })
});

app.get('/employees', function(req, res)
    {
        let query1 = `SELECT employee_id, employee_name, employee_title FROM Employees;`;
        db.pool.query(query1, function(error, rows, fields){
            res.render('employees', {data: rows});
        })
    });

app.post('/add-employee-ajax', function(req, res)
{
    let data = req.body;
    query1 = `INSERT INTO Employees (employee_name, employee_title) VALUES ('${data.employee_name}', '${data.employee_title}')`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.get('/films', function(req, res)
    {
        let query1 = `SELECT film_id AS ID, 
            film_name AS Film, 
            film_price AS Price, 
            film_in_stock AS 'In Stock' 
            FROM Films;`;
        db.pool.query(query1, function(error, rows, fields){
            res.render('films', {data: rows});
        })
    });

app.get('/orders', function(req, res)
    {
        let query1 = `SELECT order_id AS ID,
        order_date AS Date,
        total_price AS 'Total Price',
        Employees.employee_name AS Employee,
        Customers.customer_name AS Customer
        FROM Orders
        INNER JOIN Employees ON Orders.employee_id = Employees.employee_id
        INNER JOIN Customers ON Orders.customer_id = Customers.customer_id
        ORDER BY Orders.order_id ASC;`;
        db.pool.query(query1, function(error, rows, fields){
            res.render('orders', {data: rows});
        })
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


