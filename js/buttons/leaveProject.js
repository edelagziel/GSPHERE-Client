let leaveBtnInitialized = false;

export function setupLeaveProjectButton() {
  if (leaveBtnInitialized) return;
  leaveBtnInitialized = true;

  document.addEventListener("click", async function (e) {
    if (!e.target.classList.contains("leave-btn")) return;

    const projectId = e.target.dataset.id;

    if (!projectId) {
      alert("Project ID not found.");
      return;
    }

    const confirmLeave = confirm("Are you sure you want to leave this project?");
    if (!confirmLeave) return;

    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/projects/${projectId}/members/`, {
        method: "DELETE",
        credentials: "include",
      });

      const contentType = res.headers.get("content-type") || "";
      const result = contentType.includes("application/json") ? await res.json() : await res.text();

      if (res.ok) {
        alert("You have left the project successfully.");
        location.reload(); // Alternatively, remove from DOM
      } else {
        if (result.owner) {
          const confirmDelete = confirm("You are the owner of this project. Leaving will delete the project. Do you want to delete the project?");
          if (!confirmDelete) return;

          const deleteRes = await fetch(`${CONFIG.API_BASE_URL}/projects/${projectId}`, {
            method: "DELETE",
            credentials: "include",
          });

          const deleteContentType = deleteRes.headers.get("content-type") || "";
          const deleteResult = deleteContentType.includes("application/json") ? await deleteRes.json() : await deleteRes.text();

          if (deleteRes.ok) {
            alert("The project was deleted successfully.");
            location.reload(); // Alternatively, remove from DOM
          } else {
            alert(deleteResult.error || "Failed to delete the project.");
          }
        } else {
          alert(result.error || "Unable to leave the project.");
        }
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error while trying to leave the project.");
    }
  });
}
