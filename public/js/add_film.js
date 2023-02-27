// Creates a single row from an Object representing a single record from 
// Films
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("film-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let filmIdCell = document.createElement("TD");
    let filmNameCell = document.createElement("TD");
    let filmPriceCell = document.createElement("TD");
    let filmInStockCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    filmIdCell.innerText = newRow.film_id;
    filmNameCell.innerText = newRow.film_name;
    filmPriceCell.innerText = newRow.film_price;
    filmInStockCell.innerText = newRow.film_in_stock;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteFilm(newRow.film_id);
    }

    // Add the cells to the row 
    row.appendChild(filmIdCell);
    row.appendChild(filmNameCell);
    row.appendChild(filmPriceCell);
    row.appendChild(filmInStockCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.film_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}