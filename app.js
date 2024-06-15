let totalIncome = 0;
let totalExpenses = 0;
const transactionHistory = [];


function addIncome() {
    const amount = parseFloat(document.getElementById('income-amount').value);
    const source = document.getElementById('income-source').value;
    const date = document.getElementById('income-date').value;

    totalIncome += amount;
    const transaction = { type: 'income', amount, source, date };
    transactionHistory.push(transaction);
    updateSummary();
    updateHistoryList();
    
}

function addExpense() {
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;

    totalExpenses += amount;
    const transaction = { type: 'expense', amount, category, date };
    transactionHistory.push(transaction);
    updateSummary();
    updateHistoryList();
    
}

function updateSummary() {
    const netSavings = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('net-savings').textContent = netSavings.toFixed(2);
}

function updateHistoryList() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    transactionHistory.forEach((transaction, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.type.toUpperCase()} - $${transaction.amount.toFixed(2)} - ${transaction.date}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTransaction(index);

        listItem.appendChild(deleteButton);
        historyList.appendChild(listItem);
    });
}

function deleteTransaction(index) {
    transactionHistory.splice(index, 1);
    updateHistoryList();
    updateCategoryExpenses();
}

