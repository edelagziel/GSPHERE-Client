// js/pagesJs/ProjectRoom/projectMemberRoleChange.js
document.addEventListener("change", async function(e) {
    const select = e.target.closest(".role-select");
    if (!select) return;
  
    const memberId = select.dataset.userid;
    const projectId = select.dataset.projectid;
    const oldValue = select.dataset.oldValue;
    const newRole = select.value;
    const errorDiv = select.parentElement.querySelector(".role-error");
    
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
  
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/projects/${projectId}/members/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role: Number(newRole) })
    });
  
      if (!res.ok) {
        const errMsg = (await res.json()).error || await res.text();
        throw new Error(errMsg);
      }
      select.dataset.oldValue = newRole;
    } 
    catch (err) 
    {
      select.value = oldValue;
      errorDiv.textContent = "Error: " + err.message;
      errorDiv.style.display = "block";
      setTimeout(() => {
        errorDiv.style.display = "none";
        errorDiv.textContent = "";
      }, 2500); // Hide after 2.5 seconds
    }
  });
  