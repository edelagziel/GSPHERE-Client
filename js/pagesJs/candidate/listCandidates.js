import { createCandidateCard } from "../../cards/candidateCard.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const jobId = params.get("jobId");

  if (!jobId) return;

  fetch(`${CONFIG.API_BASE_URL}/jobs/${jobId}/candidates`, {
    method: "GET",
    credentials: "include",
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch candidates");
      return res.json();
    })
    .then(response => {
      console.log(response.message); // אופציונלי: הדפסת הודעת הצלחה
      renderCandidates(response.candidates);
    })
    .catch(err => {
      console.error("Error loading candidates:", err);
      showError("Failed to load candidates.");
    });
});

function renderCandidates(candidates) {
  const list = document.getElementById("candidates-list");
  const count = document.getElementById("candidate-count");

  list.innerHTML = ""; // נקה קיים

  if (!Array.isArray(candidates) || candidates.length === 0) {
    list.innerHTML = `<div class="alert alert-info text-center w-100 mb-0">No candidates found.</div>`;
    count.hidden = true;
    return;
  }

  count.textContent = `${candidates.length} candidate${candidates.length > 1 ? "s" : ""}`;
  count.hidden = false;

  candidates.forEach(candidate => {
    const card = createCandidateCard(candidate);
    list.appendChild(card);
  });
}

function showError(message) {
  const list = document.getElementById("candidates-list");
  const count = document.getElementById("candidate-count");

  list.innerHTML = `<div class="alert alert-danger text-center w-100 mb-0">${message}</div>`;
  count.hidden = true;
}
// Commit message suggestion for the last 3 hours of work:

feat: implement candidate listing page, job info display, and API integration

- Added all.Candidates.html page to display all candidates for a job
- Implemented candidate card component and rendering logic
- Integrated API calls for fetching candidates per job
- Added job info display and dynamic page title updates
- Improved config for API base URL (local/production)
- Enhanced UI with Bootstrap and custom styles
- Added error handling and empty state messages for candidate list
- Modularized JS for maintainability (cards, config, page logic)

This commit covers the main candidate listing workflow and related infrastructure.
