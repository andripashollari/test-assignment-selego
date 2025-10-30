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