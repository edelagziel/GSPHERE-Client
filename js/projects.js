window.onload = () => {
  console.log("📡 Loading projects from server...");

  fetch("https://gsphere-server.onrender.com/api/projects/mine", 
  {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      console.log("📥 Server response:", res);

      if (!res.ok) {
        return res.json().then(err => {
          console.error("❌ Server returned error JSON:", err);
          throw new Error(err.message || "Failed to fetch projects");
        }).catch(() => {
          throw new Error("Failed to fetch projects - invalid JSON");
        });
      }

      return res.json();
    })
    .then((data) => {
      console.log("✅ Projects received:", data);

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

        // תאריך בפורמט קריא
        const createdAt = project.created_at
          ? new Date(project.created_at).toLocaleDateString()
          : "Unknown date";

        // תצוגת תמונה אם קיימת
        const imageHtml = project.image_url
          ? `<img src="${project.image_url}" class="card-img-top" style="max-height:200px; object-fit:cover;" alt="Project Image">`
          : "";

        col.innerHTML = `
          <div class="card shadow-sm project-card flex-fill">
            ${imageHtml}
            <div class="card-body">
              <h5 class="card-title mb-2">${project.title}</h5>
              <p class="card-text mb-2">${project.description || ''}</p>
              <p class="text-muted mb-0" style="font-size:0.9em;">Created at: ${createdAt}</p>
            </div>
          </div>
        `;

        container.appendChild(col);
      });
    })
    .catch((err) => {
      console.error("⚠️ Error fetching projects:", err);
      document.getElementById("projects-row").innerHTML =
        "<p class='text-danger'>Failed to load projects.</p>";
    });
};
