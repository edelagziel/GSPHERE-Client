// buttons/joinProjectButton.js

export function setupJoinProjectButton() {
    document.body.addEventListener("click", async (e) => {
      const btn = e.target.closest(".join-btn");
      if (!btn) return;
  
      const projectId = btn.getAttribute("data-id");
      if (!projectId) return;
  
      // לא צריך userId ולא צריך role מהקליינט - השרת מזהה לפי הטוקן
      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/projects/${projectId}/members`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // חשוב שישלח את ה־cookie עם ה־JWT
          body: JSON.stringify({}), // אפשר אפילו לשלוח אובייקט ריק!
        });
  
        if (!res.ok) {
          const errMsg = (await res.json()).error || await res.text();
          throw new Error(errMsg);
        }
  
        alert("You have joined the project!");
        btn.disabled = true;
        btn.textContent = "Joined";
      } catch (err) {
        alert("Failed to join the project: " + err.message);
      }
    });
  }
  