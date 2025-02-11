function showTab(tabName) {
    document.getElementById('deposit').style.display = 'none';
    document.getElementById('withdrawal').style.display = 'none';
    document.getElementById('evaluation').style.display = 'none';
    document.getElementById(tabName).style.display = 'block';
    updateEvaluation();
}

function addEntry(type) {
    let amount = parseFloat(document.getElementById(type + 'Amount').value);
    let desc = document.getElementById(type + 'Desc').value;

    if (isNaN(amount) || amount <= 0 || desc === "") {
        alert("Please enter a valid amount and description.");
        return;
    }

    let entry = { amount, desc };
    let entries = JSON.parse(localStorage.getItem(type)) || [];
    entries.push(entry);
    localStorage.setItem(type, JSON.stringify(entries));

    document.getElementById(type + 'Amount').value = "";
    document.getElementById(type + 'Desc').value = "";

    displayEntries(type);
}

function displayEntries(type) {
    let list = document.getElementById(type + 'List');
    list.innerHTML = "";
    let entries = JSON.parse(localStorage.getItem(type)) || [];

    entries.forEach((entry, index) => {
        let li = document.createElement('li');
        li.textContent = `${entry.desc} - ₹${entry.amount}`;
        list.appendChild(li);
    });

    updateEvaluation();
}

function updateEvaluation() {
    let deposits = JSON.parse(localStorage.getItem('deposit')) || [];
    let withdrawals = JSON.parse(localStorage.getItem('withdrawal')) || [];

    let totalDeposits = deposits.reduce((sum, entry) => sum + entry.amount, 0);
    let totalWithdrawals = withdrawals.reduce((sum, entry) => sum + entry.amount, 0);
    let balance = totalDeposits - totalWithdrawals;

    document.getElementById('totalDeposits').textContent = totalDeposits;
    document.getElementById('totalWithdrawals').textContent = totalWithdrawals;
    document.getElementById('balance').textContent = balance;
}

// Initialize display
displayEntries('deposit');
displayEntries('withdrawal');
