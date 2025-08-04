export function setupLeaveProjectButton()
 {
    document.addEventListener("click", function(e) 
    {
      if (e.target.classList.contains("leave-btn")) {
        const projectId = e.target.dataset.id;
        if (confirm("Are you sure you want to leave this project?")) {
          alert("Left project " + projectId);
          // פה תשלב בקשת DELETE או POST לשרת
        }
      }
    });
  }
  