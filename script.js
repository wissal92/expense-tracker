const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

let transactions = dummyTransactions;

function addTransaction(e){
   e.preventDefault();
   
   let transaction;
   if (text.value.trim() === '' || amount.value.trim() === '') {
      alert('Please add a text and amount');
   } else {
        transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value  //+ to turn it from a string to a number
      };
   }

   transactions.push(transaction);

   addTransactionDOM(transaction);

   updateValues();

   text.value = '';
   amount.value = '';
}

function generateId(){
    return Math.floor(Math.random() * 1000000000);
}

function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';
  
    const item = document.createElement('li');
  
    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  
    item.innerHTML = `
     ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}
     </span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
  
    list.appendChild(item);
}

function removeTransaction(id){
   transactions = transactions.filter(item => item.id !== id);
   init();
}

function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);
    
    const total = amounts.reduce((acc, cur) => (acc += cur), 0).toFixed(2);

    const income = amounts.filter(amount => amount > 0)
                          .reduce((acc, cur) => (acc += cur), 0).toFixed(2);

    const expense = (amounts.filter(amount => amount < 0).reduce((acc, cur) => (acc += cur), 0) * -1 ).toFixed(2);

    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}

function init() {
    list.innerHTML = '';
  
    transactions.forEach(addTransactionDOM);

    updateValues();
}
  
init();

form.addEventListener('submit', addTransaction);