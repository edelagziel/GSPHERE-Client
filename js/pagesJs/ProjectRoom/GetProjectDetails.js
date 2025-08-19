import { stages, visibilities } from "../../data/projectEnums.js";

document.addEventListener("DOMContentLoaded", async () => {
  // שלוף את projectId מה־URL
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("projectId");
  if (!projectId) {
    alert("No project ID provided!");
    return;
  }

  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/projects/${projectId}`, {
      method: "GET",
      credentials: "include"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch project details");
    }

    // בהנחה שהשרת מחזיר: { project: { ... } }
    const { project } = await res.json();
    if (!project) throw new Error("Project not found");

    // שליפה מה־enums לפי id
    const stageText = stages[project.stage_id] || "Unknown";
    const visibilityText = visibilities[project.visibility_id] || "Unknown";

    // מלא לתוך הדף:
    document.getElementById("project-title").textContent = project.title || "Untitled Project";
    document.getElementById("project-stage").textContent = `Stage: ${stageText}`;
    document.getElementById("project-visibility").textContent = `Visibility: ${visibilityText}`;
    document.getElementById("project-description").textContent = project.description || "No description available";
    document.getElementById("project-image").src = project.image_url || "https://placehold.co/400x220";
  } 
  catch (err)
    {
        alert("Error loading project: " + err.message);
    }
});
