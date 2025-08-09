function getProjectIdFromUrl() 
{
    const params = new URLSearchParams(window.location.search);
    return params.get("projectId");
}
  
  document.getElementById("updateProjectForm").onsubmit = async function (e)
   {
    const projectId = getProjectIdFromUrl();
    if (!projectId) {
      alert("Project ID is missing!");
      return;
    }
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    // כתובת השרת צריכה לכלול את ה־id
    const res = await fetch(`${CONFIG.API_BASE_URL}/projects/${projectId}`, {

    // const res = await fetch(`https://gsphere-server.onrender.com/api/projects/${projectId}`, {
      method: "PUT", // או PATCH (בדוק מה השרת שלך תומך)
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  
    const result = await res.json();
    const msgDiv = document.getElementById("update-result");
    if (res.ok) {
      msgDiv.innerHTML = `<div class="alert alert-success">Project updated!</div>`;
      setTimeout(() => {
        window.location.href = "project.html";
      }, 1200);
    } else {
      msgDiv.innerHTML = `<div class="alert alert-danger">Error: ${result.error || "Failed to update project"}</div>`;
    }
  };
  