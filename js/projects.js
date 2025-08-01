// /js/project.js

window.onload = () => {
    console.log("📡 Loading projects from server...");
  
    fetch("https://gsphere-server.onrender.com/api/projects/mine", 
    {
      method: "GET",
      credentials: "include", // שולח את העוגייה עם הבקשה
    })
      .then((res) => {
        console.log("📥 Server response:", res);
  
        if (!res.ok) {
          // נסה לקרוא את גוף השגיאה
          return res.json().then(err => {
            console.error("❌ Server returned error JSON:", err);
            throw new Error(err.message || "Failed to fetch projects");
          }).catch(() => {
            // אם לא הצליח לקרוא JSON
            throw new Error("Failed to fetch projects - invalid JSON");
          });
        }
  
        return res.json();
      })
      .then((data) => {
        console.log("✅ Projects received:", data);
  
        if (!Array.isArray(data) || data.length === 0) {
          document.getElementById("projects-row").innerHTML = "<p>No projects found.</p>";
          return;
        }
  
        const container = document.getElementById("projects-row");
        container.innerHTML = "";
  
        data.forEach((project) => {
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
  