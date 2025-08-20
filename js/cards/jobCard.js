export function createJobCard(job, { LOCATION_MAP }) {
  const deadline = job.deadline ? new Date(job.deadline).toLocaleDateString() : "No deadline";
  const locationText = LOCATION_MAP[job.location_id] || job.location_id || "—";
  const skills = Array.isArray(job.skills) && job.skills.length ? job.skills.join(", ") : "—";

  const col = document.createElement("div");
  col.className = "col"; // עוטף כרטיס ב-col של Bootstrap

  // בדיקה אם המשתמש הוא מגייס
  const role = localStorage.getItem("role");
  const showApply = role !== "2"; // אם לא מגייס – true

  col.innerHTML = `
    <div class="card h-100 project-card-gaming shadow-sm card-hover-scale">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title mb-1"><i class="bi bi-briefcase me-2"></i>${job.title}</h5>
        <p class="card-text flex-grow-1">${job.description}</p>
        <ul class="list-unstyled mb-2">
          <li><strong>Location:</strong> ${locationText}</li>
          <li><strong>Skills:</strong> ${skills}</li>
          <li><strong>Deadline:</strong> ${deadline}</li>
        </ul>
        <p class="text-muted mb-2" style="font-size:0.9em;">Recruiter: ${job.recruiter_name}</p>
        ${showApply ? `<button class="btn btn-sm btn-outline-primary apply-btn mt-auto" data-id="${job.id}">
          <i class="bi bi-check2-circle"></i> Apply to this position
        </button>` : ""}
      </div>
    </div>
  `;

  return col;
}
