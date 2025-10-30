import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchExpenses, fetchProjects, createExpense } from "../api/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { toast } from "react-hot-toast";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const loadData = async () => {
    try {
      const projects = await fetchProjects();
      const proj = projects.find((p) => p._id === id);
      setProject(proj);

      const exps = await fetchExpenses(id);
      setExpenses(exps);
    } catch (error) {
      toast.error("Failed to load project data");
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="container my-4">
      <Link to="/" className="btn btn-secondary mb-3">
        &larr; Back
      </Link>
      <h2>{project.name}</h2>
      <p>
        Budget: ${project.budget} | Total Expenses: ${project.totalExpenses} |{" "}
        {project.isOverBudget ? (
          <span className="badge bg-danger">OVER BUDGET</span>
        ) : (
          <span className="badge bg-success">OK</span>
        )}
      </p>

      <ExpenseForm />
      <ExpenseList projectId={id} expenses={expenses} />
    </div>
  );
}