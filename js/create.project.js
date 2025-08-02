document.getElementById("createProjectForm").onsubmit = async function (e) 
{
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    const res = await fetch("https://gsphere-server.onrender.com/api/projects", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  
    const result = await res.json();
    const msgDiv = document.getElementById("create-result");
    if (res.ok) {
      msgDiv.innerHTML = `<div class="alert alert-success">Project created!</div>`;
      setTimeout(() => {
        window.location.href = "project.html";
      }, 1200);
    } else {
      msgDiv.innerHTML = `<div class="alert alert-danger">Error: ${result.error || "Failed to create project"}</div>`;
      window.location.href = "project.html";
    }
  };
  