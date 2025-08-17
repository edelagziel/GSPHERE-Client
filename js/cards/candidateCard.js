// components/candidateCard.js
export function createCandidateCard(candidate) {
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "col-12";
  
    // אם יש תמונת פרופיל נציג, אחרת תמונה ברירת מחדל
    const profilePic = candidate.profile_picture_url 
      ? `<img src="${candidate.profile_picture_url}" alt="Profile" class="rounded-circle me-3" style="width:56px; height:56px; object-fit:cover; border:1px solid #ddd;">`
      : `<span class="me-3"></span>`;
  
    // לינק ל־CV אם יש
    const cvLink = candidate.cv_url
      ? `<a href="${candidate.cv_url}" target="_blank" class="btn btn-sm btn-outline-secondary ms-2">View CV</a>`
      : "";
  
    // לינק ללינקדאין אם יש
    const linkedinLink = candidate.linkedin_url
      ? `<a href="${candidate.linkedin_url}" target="_blank" class="btn btn-sm btn-outline-primary ms-2">LinkedIn</a>`
      : "";
  
    cardWrapper.innerHTML = `
      <div class="card border-secondary shadow-sm">
        <div class="card-body d-flex align-items-start">
          ${profilePic}
          <div style="flex:1;">
            <h5 class="card-title mb-2">${candidate.first_name} ${candidate.last_name}</h5>
            <p class="card-text mb-1"><strong>Email:</strong> ${candidate.email}</p>
            <p class="card-text mb-1"><strong>Status:</strong> ${candidate.application_status}</p>
            <p class="card-text mb-1"><strong>Bio:</strong> ${candidate.bio ?? "—"}</p>
            <p class="card-text mb-1"><strong>Location:</strong> ${candidate.profile_location ?? "—"}</p>
            <div class="mt-2">
              ${cvLink}
              ${linkedinLink}
            </div>
            <p class="card-text mt-2"><small class="text-muted">Submitted at: ${new Date(candidate.submitted_at).toLocaleString()}</small></p>
          </div>
        </div>
      </div>
    `;
  
    return cardWrapper;
  }
  