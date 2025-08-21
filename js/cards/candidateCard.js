// components/candidateCard.js
export function createCandidateCard(candidate) {
  const cardWrapper = document.createElement("div");
  // אם תרצה 2 בעמוד שורה-שורה: הוסף col-md-6
  cardWrapper.className = "col-12";

  const profilePic = candidate.profile_picture_url
    ? `<img src="${candidate.profile_picture_url}" alt="Profile"
         class="rounded-circle me-3 border border-1 border-light-subtle"
         style="width:56px; height:56px; object-fit:cover;">`
    : `<div class="rounded-circle me-3 d-inline-block"
         style="width:56px; height:56px; background:#3b2f6f; border:1px solid rgba(255,255,255,.25);"></div>`;

  const cvLink = candidate.cv_url
    ? `<a href="${candidate.cv_url}" target="_blank" class="btn btn-sm btn-outline-warning ms-2">View CV</a>`
    : "";

  const linkedinLink = candidate.linkedin_url
    ? `<a href="${candidate.linkedin_url}" target="_blank" class="btn btn-sm btn-outline-primary ms-2">LinkedIn</a>`
    : "";

  cardWrapper.innerHTML = `
    <div class="card project-card-gaming border-0">
      <div class="card-body d-flex flex-wrap align-items-start gap-3">
        ${profilePic}
        <div class="flex-grow-1 min-w-0">
          <h5 class="card-title mb-2 text-truncate">${candidate.first_name} ${candidate.last_name}</h5>

          <p class="card-text mb-1"><strong>Email:</strong> <span class="text-break">${candidate.email}</span></p>
          <p class="card-text mb-1"><strong>Status:</strong> ${candidate.application_status}</p>
          <p class="card-text mb-1"><strong>Bio:</strong> ${candidate.bio ?? "—"}</p>
          <p class="card-text mb-1"><strong>Location:</strong> ${candidate.profile_location ?? "—"}</p>

          <div class="mt-2 d-flex flex-wrap gap-2">
            ${cvLink}
            ${linkedinLink}
          </div>

          <p class="card-text mt-2">
            <small class="text-muted">Submitted at:
              ${candidate.submitted_at ? new Date(candidate.submitted_at).toLocaleString() : "—"}
            </small>
          </p>
        </div>
      </div>
    </div>
  `;

  return cardWrapper;
}
