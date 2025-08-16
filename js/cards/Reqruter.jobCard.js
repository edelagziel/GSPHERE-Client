// ../../components/jobCard.js
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
  
    const card = document.createElement("div");
    card.className = "card h-100 border-primary shadow-sm text-bg-light card-hover-scale";
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title text-primary fw-bold">${job.title ?? "Untitled Job"}</h5>
        <p class="card-text">${job.description ?? "No description provided."}</p>
        <ul class="list-unstyled small">
          <li><strong>Status:</strong> ${statusText}</li>
          <li><strong>Location:</strong> ${locationText}</li>
          <li><strong>Skills:</strong> ${skillNames}</li>
          <li><strong>Deadline:</strong> ${deadline}</li>
        </ul>
        <p class="text-muted mb-2 small">Created at: ${createdAt}</p>
    
        <div class="mt-3">
       <button 
            class="btn btn-sm btn-outline-secondary see-candidates-btn" 
            data-id="${job.id}"
            data-title="${job.title}">
            See All Candidates
       </button>
        </div>
      </div>
    `;
  
    const wrapper = document.createElement("div");
    wrapper.className = "col-12 col-md-10 mx-auto mb-4"; // גורם לכרטיס להיות רחב ומרוכז
    wrapper.appendChild(card);
    return wrapper;
  }
  