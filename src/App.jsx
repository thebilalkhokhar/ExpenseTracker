import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./components/expenseData";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [expense, setExpense] = useLocalStorage("expense", {
    title: "",
    category: "",
    amount: "",
    // email: "",
  });
  const [expenses, setExpenses] = useLocalStorage("expenses", expenseData);
  const [editingRowId, setEditingRowId] = useLocalStorage("editingRowi=Id", "");

  // const [localData, setLocalData] = useLocalStorage("myNum", [1, 2, 3]);
  // console.log(localData);

  return (
    <>
      <main>
        <h1
        // onClick={() => {
        //   setLocalData((prevState) => [...prevState, 4, 5, 6]);
        // }}
        >
          Track Your Expense
        </h1>
        {/* <h2>{localData.join(", ")}</h2> */}
        <div className="expense-tracker">
          <ExpenseForm
            setExpenses={setExpenses}
            expense={expense}
            setExpense={setExpense}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
          />
          <ExpenseTable
            expenses={expenses}
            setExpenses={setExpenses}
            expense={expense}
            setExpense={setExpense}
            setEditingRowId={setEditingRowId}
          />
        </div>
      </main>
    </>
  );
}

export default App;
