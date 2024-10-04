import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  setEditingRowId,
}) {
  const [errors, setErrors] = useState({});

  const validationCOnfig = {
    title: [
      { required: true, message: "Title required" },
      { minLength: 2, message: "Title should be atleast 5 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [
      { required: true, message: "Please enter an amount" },
      { pattern: /^(0|[1-9]\d*)$/, message: "Please enter a valid number" },
    ],
    // email: [
    //   { required: true, message: "Please enter an email" },
    //   {
    //     pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //     message: "Please enter a valid email",
    //   },
    // ],
  };

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      console.log(validationCOnfig[key]);
      validationCOnfig[key].some((rule) => {
        console.log(rule);
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 2) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(expense);
    const validatedResult = validate(expense);

    if (Object.keys(validatedResult).length) return;

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setExpense({
        title: "",
        category: "",
        amount: "",
        // email: "",
      });
      setEditingRowId("");
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
      // email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, [name]);
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };
  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOption={"Select category4"}
        error={errors.category}
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      {/* <Input
        label="Email"
        id="email"
        name="email"
        value={expense.email}
        onChange={handleChange}
        error={errors.email}
      /> */}
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
}
