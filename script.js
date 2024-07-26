document.addEventListener('DOMContentLoaded', function () {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/12i1RNVNo-5eVunI_x5h1qIS3mPkJ55iI/gviz/tq?tqx=out:json';

    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            // Remove the unnecessary prefix and suffix from the response
            const jsonData = JSON.parse(data.replace('/*O_o*/\ngoogle.visualization.Query.setResponse(', '').replace(');', ''));

            // Extract rows from the JSON data
            const rows = jsonData.table.rows;
            const tableBody = document.querySelector('#data-table tbody');

            rows.forEach(row => {
                const tr = document.createElement('tr');
                row.c.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell ? cell.v : '';
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
