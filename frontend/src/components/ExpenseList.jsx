import { deleteExpense } from "../api/api.js";
import { toast } from "react-hot-toast";

export default function ExpenseList({ projectId, expenses }) {
  const handleDelete = async (expenseId) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await deleteExpense(projectId, expenseId);
      toast.success("Expense deleted!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!expenses.length) return <p>No expenses yet.</p>;

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp._id}>
            <td>{exp.title}</td>
            <td>${exp.amount}</td>
            <td>{exp.category || "Uncategorized"}</td>
            <td>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(exp._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
