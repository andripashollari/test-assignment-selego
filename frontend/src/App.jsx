import { Toaster } from "react-hot-toast";
import ProjectForm from "./components/ProjectForm";
import { useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  const handleAddProject = async (project) => {
    const savedProject = await createProject(project);
    setProjects([...projects, savedProject]);
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Budget Tracker</h1>

      <Toaster position="top-right" reverseOrder={false} />

      <ProjectForm onCreate={handleAddProject} />
    </div>
  );
}

export default App;