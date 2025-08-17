document.addEventListener("DOMContentLoaded", () => {
    // Listen for any Join button click on the page (including dynamically rendered buttons)
    document.body.addEventListener("click", async (e) => {
      const btn = e.target.closest(".join-btn");
      if (!btn) return;
  
      const projectId = btn.getAttribute("data-id");
      if (!projectId) return;
  
      // Get user_id from localStorage (update according to your implementation)
      const userId = localStorage.getItem("user_id");
      const role = 2; // Example: regular member (update as needed)

  
      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/projects/${projectId}/members`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies if needed
          body: JSON.stringify({ user_id: userId, role }),
        });
  
        if (!res.ok) {
          const errMsg = (await res.json()).error || await res.text();
          throw new Error(errMsg);
        }
  
        alert("Join request sent successfully!");
        // You can update the button/refresh the page/show a visual indicator
        btn.disabled = true;
        btn.textContent = "Joined";
      } catch (err) {
        alert("Failed to join the project: " + err.message);
      }
    });
  });