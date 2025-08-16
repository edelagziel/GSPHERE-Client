export function createJobCard(job, { LOCATION_MAP }) {
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
          <p class="text-muted mb-2" style="font-size:0.9em;">Recruiter: ${job.recruiter_name}</p>
          <button class="btn btn-sm btn-primary apply-btn" data-id="${job.id}">Apply to this position</button>
        </div>
      </div>
    `;
  
    return col;
  }
  