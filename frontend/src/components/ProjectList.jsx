import React, { useState } from "react";
import { deleteProject, updateProject } from "../api/api";
import { toast } from "react-hot-toast";

export default function ProjectList({ projects, onClickProject, onRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [editName, setEditName] = useState("");
  const [editBudget, setEditBudget] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      toast.success("Project deleted!");
      onRefresh(); // reload projects
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditClick = (project) => {
    setCurrentProject(project);
    setEditName(project.name);
    setEditBudget(project.budget);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await updateProject({ id: currentProject._id, name: editName, budget: Number(editBudget) });
      toast.success("Project updated!");
      setShowModal(false);
      onRefresh(); // reload projects
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!projects.length) return <p>No projects yet.</p>;

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Budget</th>
            <th>Total Expenses</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td onClick={() => onClickProject(project._id)} style={{ cursor: "pointer" }}>
                {project.name}
              </td>
              <td>${project.budget}</td>
              <td>${project.totalExpenses}</td>
              <td>
                {project.isOverBudget ? (
                  <span className="badge bg-danger">OVER BUDGET</span>
                ) : (
                  <span className="badge bg-success">OK</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEditClick(project)}
                >
                  Update
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(project._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Project</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Project Name"
                />
                <input
                  type="number"
                  className="form-control"
                  value={editBudget}
                  onChange={(e) => setEditBudget(e.target.value)}
                  placeholder="Budget"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}