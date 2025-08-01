window.onload = () => {
  console.log("📡 Loading projects from server...");

  fetch("https://gsphere-server.onrender.com/api/projects/mine", {
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

      // השינוי כאן! ניגשים ל-data.projects ולא ל-data ישירות
      const projects = data.projects || [];

      if (projects.length === 0) {
        document.getElementById("projects-row").innerHTML = "<p>No projects found.</p>";
        return;
      }

      const container = document.getElementById("projects-row");
      container.innerHTML = "";

      projects.forEach((project) => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${project.title}</h5>
              <p class="card-text">${project.description}</p>
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
