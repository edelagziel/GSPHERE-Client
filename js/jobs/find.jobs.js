const LOCATION_MAP = {
    1: "Remote",
    2: "Tel Aviv",
    3: "Jerusalem",
    4: "Haifa",
    5: "Other"
  };
  
  window.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("search-results");
    const noResults = document.getElementById("no-results");
    container.innerHTML = `<div class="text-center text-muted py-3">Loading jobs...</div>`;
  
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/jobs/active`, { credentials: "include" });
      const data = await res.json();
      const jobs = data.jobs || [];
  
      container.innerHTML = "";
  
      if (!jobs.length) {
        noResults.classList.remove("d-none");
        return;
      }
  
      noResults.classList.add("d-none");
  
      jobs.forEach(job => {
        const deadline = job.deadline ? new Date(job.deadline).toLocaleDateString() : "No deadline";
        const locationText = LOCATION_MAP[job.location_id] || job.location_id || "—";
        const skills = Array.isArray(job.skills) && job.skills.length ? job.skills.join(", ") : "—";
  
        const col = document.createElement("div");
        col.className = "col";
  
        col.innerHTML = `
          <div class="card h-100 border-primary shadow-sm card-hover-scale text-bg-light">
            <div class="card-body">
              <h5 class="card-title text-primary">${job.title}</h5>
              <p class="card-text">${job.description}</p>
              <ul class="list-unstyled mb-2">
                <li><strong>Location:</strong> ${locationText}</li>
                <li><strong>Skills:</strong> ${skills}</li>
                <li><strong>Deadline:</strong> ${deadline}</li>
              </ul>
              <p class="text-muted mb-0" style="font-size:0.9em;">Recruiter: ${job.recruiter_name}</p>
            </div>
          </div>
        `;
        container.appendChild(col);
      });
    } catch (err) {
      console.error("Error fetching jobs:", err);
      container.innerHTML = `<div class="alert alert-danger text-center">Failed to load jobs.</div>`;
    }
  });
  