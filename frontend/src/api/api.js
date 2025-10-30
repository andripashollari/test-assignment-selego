const BASE_URL = "http://localhost:5001/api";


export const createProject = async ({ name, budget }) => {
  try {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, budget }), // send exactly what backend expects
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to create project");
    }

    return data.data; // the saved project object
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${BASE_URL}/projects`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch projects");
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchExpenses = async (projectId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/expenses`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch expenses");
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  const res = await fetch(`${BASE_URL}/projects/${id}`, { method: "DELETE" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to delete project");
  return data.data;
};

export const updateProject = async ({ id, name, budget }) => {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, budget }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update project");
  return data.data;
};