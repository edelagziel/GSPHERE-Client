// recruiter.js

window.onload = async () => {
    // הצגת שם המגייס
    const name = localStorage.getItem("fullname");
    if (name) {
      const nameSpan = document.getElementById("recruiter-name");
      if (nameSpan) nameSpan.textContent = name;
    }
  
    // טען את המשרות מהשרת
    const container = document.getElementById("job-list");
    container.innerHTML = `<div class="text-center text-muted py-3">Loading jobs...</div>`;
  
    try {
      const res = await fetch("https://gsphere-server.onrender.com/api/jobs/my", {
        method: "GET",
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      const jobs = data.job || [];
  
      container.innerHTML = ""; // ננקה לפני הצגה
  
      if (jobs.length === 0) {
        container.innerHTML = `<div class="alert alert-info text-center">No job postings yet.</div>`;
        return;
      }
  
      // הצגה של כל משרה (קלף Bootstrap)
      jobs.forEach(job => {
        // תאריך יצירה + דדליין בפורמט קריא
        const createdAt = job.created_at
          ? new Date(job.created_at).toLocaleDateString()
          : "Unknown";
        const deadline = job.deadline
          ? new Date(job.deadline).toLocaleDateString()
          : "No deadline";
  
        // הוספת קלף משרה
        container.innerHTML += `
          <div class="card mb-3 shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-2">${job.title}</h5>
              <p class="card-text mb-2">${job.description || ''}</p>
              <ul class="list-unstyled mb-2">
                <li><strong>Status:</strong> ${job.status_id}</li>
                <li><strong>Location:</strong> ${job.location_id}</li>
                <li><strong>Deadline:</strong> ${deadline}</li>
              </ul>
              <p class="text-muted mb-0" style="font-size:0.9em;">Created at: ${createdAt}</p>
            </div>
          </div>
        `;
      });
  
    } 
    catch (err) 
    {
      container.innerHTML = `<div class="alert alert-danger text-center">Failed to load jobs.</div>`;
      console.error("Error fetching jobs:", err);
    }
  };
  