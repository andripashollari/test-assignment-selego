import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { createExpense } from "../api/api";

export default function ExpenseForm( ) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) {
      toast.error("Title and amount are required");
      return;
    }

    try {
      await createExpense({ title, amount: Number(amount), category });
      toast.success("Expense added!");
      setTitle("");
      setAmount("");
      setCategory("");
    } catch (error) {
      toast.error(error.message || "Failed to add expense");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 row g-2">
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="col-md-2">
        <input
          type="number"
          className="form-control"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <button type="submit" className="btn btn-primary w-100">
          Add Expense
        </button>
      </div>
    </form>
  );
}