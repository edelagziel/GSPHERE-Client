const STATUS_MAP = {
    1: "Open",
    2: "Interviewing",
    3: "Closed"
  };
  const LOCATION_MAP = {
    1: "Remote",
    2: "Tel Aviv",
    3: "Jerusalem",
    4: "Haifa",
    5: "Other"
  };
  
  window.onload = async () => {
    // הצגת שם המגייס
    const name = localStorage.getItem("fullname");
    if (name) {
      const nameSpan = document.getElementById("recruiter-name");
      if (nameSpan) nameSpan.textContent = name;
    }
  
    // טען את המשרות
    const container = document.getElementById("job-list");
    container.innerHTML = `<div class="text-center text-muted py-3">Loading jobs...</div>`;
  
    try {
      const res = await fetch("https://gsphere-server.onrender.com/api/jobs/my", { credentials: "include" });
      const data = await res.json();
      const jobs = data.job || [];
  
      container.innerHTML = "";
  
      if (jobs.length === 0) {
        container.innerHTML = `<div class="alert alert-info text-center">No job postings yet.</div>`;
        return;
      }
  
      jobs.forEach(job => {
        // הצגת שמות הסקילס של המשרה
        const skillNames = Array.isArray(job.skills) && job.skills.length
          ? job.skills.map(skill => skill.name).join(", ")
          : "—";
  
        const createdAt = job.created_at ? new Date(job.created_at).toLocaleDateString() : "Unknown";
        const deadline = job.deadline ? new Date(job.deadline).toLocaleDateString() : "No deadline";
        const statusText = STATUS_MAP[job.status_id] || job.status_id;
        const locationText = LOCATION_MAP[job.location_id] || job.location_id;
  
        container.innerHTML += `
          <div class="card mb-3 shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-2">${job.title}</h5>
              <p class="card-text mb-2">${job.description || ''}</p>
              <ul class="list-unstyled mb-2">
                <li><strong>Status:</strong> ${statusText}</li>
                <li><strong>Location:</strong> ${locationText}</li>
                <li><strong>Skills:</strong> ${skillNames}</li>
                <li><strong>Deadline:</strong> ${deadline}</li>
              </ul>
              <p class="text-muted mb-0" style="font-size:0.9em;">Created at: ${createdAt}</p>
            </div>
          </div>
        `;
      });
    }
    catch (err) {
      container.innerHTML = `<div class="alert alert-danger text-center">Failed to load jobs.</div>`;
      console.error("Error fetching jobs:", err);
    }
  };
  