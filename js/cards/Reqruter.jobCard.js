export function createJobCard(job, { skillsMap, STATUS_MAP, LOCATION_MAP }) 
{
    let skillNames = "—";
    if (Array.isArray(job.skill_ids)) {
      const names = job.skill_ids.map(id => skillsMap.get(Number(id))).filter(Boolean);
      if (names.length) skillNames = names.join(", ");
    } else if (Array.isArray(job.skills)) {
      const names = job.skills.map(s => (typeof s === "string" ? s : s?.name)).filter(Boolean);
      if (names.length) skillNames = names.join(", ");
    }
  
    const createdAt = job.created_at ? new Date(job.created_at).toLocaleDateString() : "Unknown";
    const deadline = job.deadline ? new Date(job.deadline).toLocaleDateString() : "No deadline";
    const statusText = STATUS_MAP[job.status_id] || job.status_id || "Unknown";
    const locationText = LOCATION_MAP[job.location_id] || job.location_id || "—";
  
    // עדכון למחלקת עיצוב הגיימינג שלך בלבד
    const card = document.createElement("div");
    card.className = "card h-100 project-card-gaming shadow-none card-hover-scale";
    card.innerHTML = `
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${job.title ?? "Untitled Job"}</h5>
        <p class="card-text flex-grow-1">${job.description ?? "No description provided."}</p>
        <ul class="list-unstyled small mb-2">
          <li><strong>Status:</strong> ${statusText}</li>
          <li><strong>Location:</strong> ${locationText}</li>
          <li><strong>Skills:</strong> ${skillNames}</li>
          <li><strong>Deadline:</strong> ${deadline}</li>
        </ul>
        <p class="text-muted mb-2 small">Created at: ${createdAt}</p>
        <div class="mt-auto d-flex gap-2 flex-wrap">
          <button 
            class="btn btn-sm btn-outline-secondary see-candidates-btn" 
            data-id="${job.id}"
            data-title="${job.title}">
            See All Candidates
          </button>
          <button 
            class="btn btn-sm btn-outline-primary update-job-btn" 
            data-id="${job.id}">
            Update Job
          </button>
          <button 
            class="btn btn-sm btn-outline-danger delete-job-btn" 
            data-id="${job.id}">
            Delete Job
          </button>
        </div>
      </div>
    `;
  
    const wrapper = document.createElement("div");
    wrapper.className = "col-12 col-md-10 mx-auto mb-4"; // נשאר רחב כמו קודם
    wrapper.appendChild(card);
    return wrapper;
}
