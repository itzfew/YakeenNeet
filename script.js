document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'AIzaSyARnFAl7XmzJMIYZ83HfoDnQ8cdleMyHcs'; // Your API key
    const sheetId = '12i1RNVNo-5eVunI_x5h1qIS3mPkJ55iI'; // Your Google Sheet ID
    const range = 'Sheet1'; // Adjust this if your sheet name or range is different

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const values = data.values;
            const tableBody = document.querySelector('#data-table tbody');

            // Check if the data is present and has at least one row
            if (values && values.length > 1) {
                const headers = values[0]; // First row as header
                // Create table headers
                const thead = document.querySelector('#data-table thead');
                const headerRow = document.createElement('tr');
                headers.forEach(header => {
                    const th = document.createElement('th');
                    th.textContent = header;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);

                // Create table rows
                values.slice(1).forEach(row => {
                    const tr = document.createElement('tr');
                    row.forEach(cell => {
                        const td = document.createElement('td');
                        td.textContent = cell || '';
                        tr.appendChild(td);
                    });
                    tableBody.appendChild(tr);
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
