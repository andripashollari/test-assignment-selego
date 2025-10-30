import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProjectForm({ onCreate }) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !budget) {
      toast.error("Please provide a name and budget");
      return;
    }

    try {

      await onCreate({ name, budget: Number(budget) });
      toast.success("Project added successfully!");

      setName("");
      setBudget("");
      
    } catch (error) {
      toast.error("Failed to add project");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 row g-2">
      <div className="col-md-6">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="col-md-3">
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="col-md-3">
        <button type="submit" className="btn btn-primary w-100">
          Add Project
        </button>
      </div>
    </form>
  );
}
