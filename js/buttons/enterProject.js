export function setupEnterProjectButton() {
    document.addEventListener("click", function(e) {
      if (e.target.classList.contains("enter-btn")) {
        const projectId = e.target.dataset.id;
        window.location.href = `project_details.html?projectId=${projectId}`;
      }
    });
  }
  