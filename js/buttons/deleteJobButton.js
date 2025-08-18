export function setupDeleteJobButton(button) {
    if (!button) return;
  
    const jobId = button.getAttribute("data-id");
    if (!jobId) return;
  
    button.addEventListener("click", async () => {
      const confirmed = confirm("Are you sure you want to delete this job?");
      if (!confirmed) return;
  
      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/jobs/${jobId}`, {
          method: "DELETE",
          credentials: "include"
        });
  
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Failed to delete job");
        }
  
        alert("Job deleted successfully!");
        const card = button.closest(".card");
        if (card) card.remove();
  
      } catch (err) {
        console.error("Error deleting job:", err);
        alert("Error deleting job: " + err.message);
      }
    });
  }
  