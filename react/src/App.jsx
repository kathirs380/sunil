import { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = () => {
    if (!category || !amount) return;

    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount: Number(amount),
    };

    setTransactions([...transactions, newTransaction]);
    setCategory("");
    setAmount("");
  };

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const categorySummary = {};

  transactions.forEach((t) => {
    if (t.type === "Expense") {
      categorySummary[t.category] =
        (categorySummary[t.category] || 0) + t.amount;
    }
  });

  return (
    <div className="container">
      <h1>Daily Expense Analytics Dashboard</h1>

      <div className="form">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addTransaction}>Add</button>
      </div>

      <div className="summary">
        <div className="card">
          <h3>Total Income</h3>
          <p>₹ {income}</p>
        </div>

        <div className="card">
          <h3>Total Expense</h3>
          <p>₹ {expense}</p>
        </div>

        <div className="card">
          <h3>Balance</h3>
          <p>₹ {balance}</p>
        </div>
      </div>

      <h2>Transactions</h2>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>₹ {t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Category-wise Expenses</h2>

      <ul className="category-list">
        {Object.entries(categorySummary).map(([cat, amt]) => (
          <li key={cat}>
            {cat} : ₹ {amt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;