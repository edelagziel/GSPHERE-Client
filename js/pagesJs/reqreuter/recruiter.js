// recruiter.page.js (load as module)
import { getSkills } from "../../data/skillsService.js";
import { createJobCard } from "../../cards/Reqruter.jobCard.js";
import "../../buttons/Page.seeCandidatesButton.js";


// Status mapping for job postings
const STATUS_MAP = {
  1: "Open",
  2: "Interviewing",
  3: "Closed"
};
// Location mapping for job postings
const LOCATION_MAP = {
  1: "Remote",
  2: "Tel Aviv",
  3: "Jerusalem",
  4: "Haifa",
  5: "Other"
};

window.addEventListener("DOMContentLoaded", async () => {
  // Set recruiter name from localStorage
  const name = localStorage.getItem("fullname");
  const nameSpan = document.getElementById("recruiter-name");
  if (name && nameSpan) nameSpan.textContent = name;

  // Get the container for job cards
  const container = document.getElementById("job-list");
  container.innerHTML = `<div class="text-center text-muted py-3">Loading jobs...</div>`;

  try {
    // Map skills only once
    const skillsArr = await getSkills(); // [{id,name}, ...]
    const skillsMap = new Map(skillsArr.map(s => [Number(s.id), s.name]));

    // Fetch the recruiter's jobs
    const res = await fetch(`${CONFIG.API_BASE_URL}/jobs/my`, { credentials: "include" });
    const data = await res.json();
    const jobs = data.jobs || data.job || [];

    container.innerHTML = "";
    if (!Array.isArray(jobs) || jobs.length === 0) {
      container.innerHTML = `<div class="alert alert-info text-center">No job postings yet.</div>`;
      return;
    }

    // Build job cards using the component
    const frag = document.createDocumentFragment();
    for (const job of jobs) 
    {
      const card = createJobCard(job, { skillsMap, STATUS_MAP, LOCATION_MAP });
      frag.appendChild(card);
    }
    container.appendChild(frag);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    container.innerHTML = `<div class="alert alert-danger text-center">Failed to load jobs.</div>`;
  }
});
