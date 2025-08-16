// applyListener.js

document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".apply-btn");
    if (!btn) return;
  
    const jobId = btn.dataset.id;
    if (!jobId) return;
  
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/jobs/${jobId}/apply`, 
    {
        method: "POST",
        credentials: "include", // כדי שה־cookie יישלח
        headers: {
          "Content-Type": "application/json"
        },
    });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Application failed");
      }
  
      alert("Successfully applied to the job!");
      btn.disabled = true;
      btn.textContent = "Applied";
    } catch (err) {
      console.error("Error applying to job:", err);
      alert("Could not apply to job.");
    }
  });
  