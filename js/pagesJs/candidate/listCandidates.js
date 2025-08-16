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

