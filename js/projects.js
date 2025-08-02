import { stages, visibilities } from './projectEnums.js';

window.onload = () => {
  fetch("https://gsphere-server.onrender.com/api/projects/mine", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => res.ok ? res.json() : Promise.reject())
    .then((data) => {
      const projects = data.projects || [];
      const container = document.getElementById("projects-row");
      const noProjects = document.getElementById("no-projects");
      container.innerHTML = "";

      if (projects.length === 0) {
        if (noProjects) noProjects.classList.remove("d-none");
        return;
      } else {
        if (noProjects) noProjects.classList.add("d-none");
      }

      projects.forEach((project) => {
        const col = document.createElement("div");
        col.className = "col-sm-10 col-md-6 col-lg-4 mb-4 d-flex";

        // --- תאריך קריא
        const createdAt = project.created_at
          ? new Date(project.created_at).toLocaleDateString()
          : "Unknown date";

        // --- טקסטים של stage/visibility
        const stageText = stages[project.stage_id] || "Unknown stage";
        const visibilityText = visibilities[project.visibility_id] || "Unknown";

        // --- תמונה
        const imgUrl = (project.image_url && project.image_url.trim() !== "")
          ? project.image_url
          : "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";
        const imageHtml = `
          <img src="${imgUrl}"
            class="card-img-top"
            style="max-height:200px; object-fit:cover;"
            alt="Project Image"
            onerror="this.onerror=null;this.src='https://dummyimage.com/300x200/cccccc/000000&text=No+Image';">
        `;

        col.innerHTML = `
          <div class="card shadow-sm project-card flex-fill">
            ${imageHtml}
            <div class="card-body">
              <h5 class="card-title mb-2">${project.title}</h5>
              <p class="card-text mb-2">${project.description || ''}</p>
              <ul class="list-unstyled mb-2">
                <li><strong>Stage:</strong> ${stageText}</li>
                <li><strong>Visibility:</strong> ${visibilityText}</li>
              </ul>
              <p class="text-muted mb-0" style="font-size:0.9em;">Created at: ${createdAt}</p>
            </div>
          </div>
        `;
        container.appendChild(col);
      });
    })
    .catch((err) => {
      document.getElementById("projects-row").innerHTML =
        "<p class='text-danger'>Failed to load projects.</p>";
    });
};

// שם משתמש
document.addEventListener("DOMContentLoaded", function() {
  const name = localStorage.getItem("fullname");
  if (name) {
    const welcomeDiv = document.getElementById("welcome-user");
    if (welcomeDiv)
      welcomeDiv.innerHTML = `<h5>Welcome, <span class="text-primary">${name}</span>!</h5>`;
  }
});
