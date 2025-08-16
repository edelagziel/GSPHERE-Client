// components/candidateCard.js
export function createCandidateCard(candidate) 
{
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "col-12";
  
    cardWrapper.innerHTML = `
      <div class="card border-secondary shadow-sm">
        <div class="card-body">
          <h5 class="card-title mb-2">${candidate.first_name} ${candidate.last_name}</h5>
          <p class="card-text mb-1"><strong>Email:</strong> ${candidate.email}</p>
          <p class="card-text mb-1"><strong>Status:</strong> ${candidate.application_status}</p>
          <p class="card-text"><strong>Submitted at:</strong> ${new Date(candidate.submitted_at).toLocaleString()}</p>
        </div>
      </div>
    `;
  
    return cardWrapper;
  }
  