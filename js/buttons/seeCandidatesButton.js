
document.addEventListener("click", async (e) => 
{
  const btn = e.target.closest(".see-candidates-btn");
  if (!btn) return;

  const jobId = btn.dataset.id;
  if (!jobId) return;

  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/jobs/${jobId}/candidates`, {
      method: "GET",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch candidates. Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Candidates:", data);
    // כאן אפשר לעבור לעמוד אחר, לפתוח מודל, או להציג את המידע

  } catch (err) {
    console.error("Error fetching candidates:", err);
    alert("Failed to load candidates.");
  }
});
