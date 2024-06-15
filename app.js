let totalIncome = 0;
let totalExpenses = 0;
const transactionHistory = [];
let categoryExpenses = {};
const budgetGoals = {};

function addIncome() {
    const amount = parseFloat(document.getElementById('income-amount').value);
    const source = document.getElementById('income-source').value;
    const date = document.getElementById('income-date').value;

    totalIncome += amount;
    const transaction = { type: 'income', amount, source, date };
    transactionHistory.push(transaction);
    updateSummary();
    updateHistoryList();
    updateCategoryExpenses();
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
    updateCategoryExpenses();
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

function updateCategoryExpenses() {
    categoryExpenses = {};

    transactionHistory
        .filter(transaction => transaction.type === 'expense')
        .forEach(transaction => {
            const category = transaction.category.toLowerCase();
            categoryExpenses[category] = (categoryExpenses[category] || 0) + transaction.amount;
        });

    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    for (const category in categoryExpenses) {
        const listItem = document.createElement('li');
        listItem.textContent = `${category.toUpperCase()} - $${categoryExpenses[category].toFixed(2)}`;
        categoryList.appendChild(listItem);
    }
}

function setBudget() {
    const category = document.getElementById('budget-category').value.toLowerCase();
    const amount = parseFloat(document.getElementById('budget-amount').value);

    budgetGoals[category] = amount;
    updateBudgetGoals();
}

function updateBudgetGoals() {
    console.log(budgetGoals); // You can update the UI or perform additional logic here
}

// ... (remaining JavaScript code) ...
