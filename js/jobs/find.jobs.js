import "../buttons/applyListener.js";
import { createJobCard } from "../cards/jobCard.js"; 

const LOCATION_MAP = {
  1: "Remote",
  2: "Tel Aviv",
  3: "Jerusalem",
  4: "Haifa",
  5: "Other"
};

window.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("search-results");
  const noResults = document.getElementById("no-results");
  container.innerHTML = `<div class="text-center text-muted py-3">Loading jobs...</div>`;

  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/jobs/active`, { credentials: "include" });
    const data = await res.json();
    const jobs = data.jobs || [];

    container.innerHTML = "";

    if (!jobs.length) {
      noResults.classList.remove("d-none");
      return;
    }

    noResults.classList.add("d-none");

    jobs.forEach(job => {
      const card = createJobCard(job, { LOCATION_MAP });
      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error fetching jobs:", err);
    container.innerHTML = `<div class="alert alert-danger text-center">Failed to load jobs.</div>`;
  }
});
