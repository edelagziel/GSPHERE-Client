const params = new URLSearchParams(window.location.search);
const projectId = params.get("projectId");

if (!projectId) {
  alert("Project ID missing in URL");
  throw new Error("Project ID missing in URL");
}

fetch(`${CONFIG.API_BASE_URL}/projects/${projectId}`, {
  method: "GET",
  credentials: "include"
})
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch project");
    return res.json();
  })
  .then(data => {
    const project = data.project;

    // מלא את השדות בטופס
    document.querySelector('input[name="title"]').value = project.title;
    document.querySelector('textarea[name="description"]').value = project.description;
    document.querySelector('input[name="image_url"]').value = project.image_url;

    // תצוגה של תמונת preview אם יש
    const preview = document.getElementById("img-preview");
    if (preview && project.image_url) {
      preview.src = project.image_url;
      preview.style.display = "block";
    }

    document.querySelector('select[name="stage_id"]').value = project.stage_id;
    document.querySelector('select[name="visibility_id"]').value = project.visibility_id;
  })
  .catch(err => {
    console.error(err);
    alert("Failed to load project data.");
  });
