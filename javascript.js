let intervalId;
const tableBody = document.getElementById('data-table').querySelector('tbody');
let tableData = [];
function getRandomData() {
    const randomNumber = Math.floor(Math.random() * 1000);
    const randomText = Math.random().toString(36).substring(7);
    const currentDate = new Date().toLocaleString();
    tableData.push({ randomNumber, randomText, currentDate });
    return { randomNumber, randomText, currentDate };
}

function addRow() {
    const rowCount = tableBody.rows.length + 1;
    const rowData = getRandomData();

    const row = document.createElement('tr');
    row.className = rowCount % 2 === 0 ? 'even' : 'odd'; 

    row.innerHTML = `
                <td>${rowCount}</td>
                <td>${rowData.randomNumber}</td>
                <td>${rowData.randomText}</td>
                <td>${rowData.currentDate}</td>
            `;

    tableBody.appendChild(row);
}

function startGeneration() {
    const interval = parseInt(document.getElementById('interval').value);
    if (isNaN(interval) || interval < 100) {
        alert('Будь ласка, введіть коректний інтервал (мінімум 100 мс).');
        return;
    }
    stopGeneration();
    intervalId = setInterval(addRow, interval);
}

function stopGeneration() {
    clearInterval(intervalId);
}

function clearTable() {
    clearInterval(intervalId);
    tableBody.innerHTML = '';
}

function saveTable() {
    let string_table_data = JSON.stringify(tableData);

    const blob = new Blob([string_table_data], {type: "appication/json"});
    const save_a = document.createElement('a');
    save_a.href = URL.createObjectURL(blob);
    save_a.download = "data.json";
    save_a.innerText = "save";
    document.body.appendChild(save_a);
}