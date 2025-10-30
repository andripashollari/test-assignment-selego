import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import { fetchProjects, createProject } from "../api/api";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAddProject = async (project) => {
    try {
      const savedProject = await createProject(project);
      setProjects([...projects, savedProject]);
      toast.success("Project added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Budget Tracker</h1>
      <ProjectForm onAdd={handleAddProject} />
      <ProjectList projects={projects} onClickProject={(id) => navigate(`/${id}`)} onRefresh={loadProjects} />

    </div>
  );
}