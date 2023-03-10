// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-form-ajax');

// Modify the objects we need
addOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderDate = document.getElementById("input-order_date");
    let inputTotalPrice = document.getElementById("input-total_price");
    let inputEmployeeId = document.getElementById("input-employee_id-ajax");
    let inputCustomerId = document.getElementById("input-customer_id-ajax");
    let inputFilmId = document.getElementById("input-film_id-ajax");

    // Get the values from the form fields
    let orderDateValue = inputOrderDate.value;
    let totalPriceValue = inputTotalPrice.value;
    let employeeIdValue = inputEmployeeId.value;
    let customerIdValue = inputCustomerId.value;
    let filmIdValue = inputFilmId.value;

    // Put our data we want to send in a javascript object
    let data = {
        order_date: orderDateValue,
        total_price: totalPriceValue,
        employee_id: employeeIdValue,
        customer_id: customerIdValue,
        film_id: filmIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderDate.value = '';
            inputTotalPrice.value = '';
            inputEmployeeId.value = '';
            inputCustomerId.value = '';
            inputFilmId.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Orders
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("order-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let orderIdCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let totalPriceCell = document.createElement("TD");
    let employeeIdCell = document.createElement("TD");
    let customerIdCell = document.createElement("TD");
    let filmIdCell = document.createElement("TD");

    // Fill the cells with correct data
    orderIdCell.innerText = newRow.order_id;
    orderDateCell.innerText = newRow.order_date;
    totalPriceCell.innerText = newRow.total_price;
    employeeIdCell.innerText = newRow.employee_id;
    customerIdCell.innerText = newRow.customer_id;
    filmIdCell.innerText = newRow.film_id;

    // Add the cells to the row 
    row.appendChild(orderIdCell);
    row.appendChild(orderDateCell);
    row.appendChild(totalPriceCell);
    row.appendChild(employeeIdCell);
    row.appendChild(customerIdCell);
    row.appendChild(filmIdCell);
    
    // Add the row to the table
    currentTable.appendChild(row);

    window.location.reload();
}