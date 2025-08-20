import "../buttons/applyListener.js";
import { createJobCard } from "../cards/jobCard.js";
import { filterItems } from "../jobs/searchBar.js"; // קישור לפונקציית הסינון

const LOCATION_MAP = {
  1: "Remote",
  2: "Tel Aviv",
  3: "Jerusalem",
  4: "Haifa",
  5: "Other"
};

let jobs = [];

window.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("search-results");
  const noResults = document.getElementById("no-results");
  const searchInput = document.getElementById("search-input");
  const searchForm = document.getElementById("search-form");

  container.innerHTML = `<div class="text-center text-muted py-3">Loading jobs...</div>`;

  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/jobs/active`, { credentials: "include" });
    const data = await res.json();
    jobs = data.jobs || [];
    renderJobs(jobs);

    // חיפוש בזמן הקלדה
    searchInput.addEventListener("input", filterAndRenderJobs);

    // וגם בלחיצה על כפתור Search
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      filterAndRenderJobs();
    });

  } catch (err) {
    console.error("Error fetching jobs:", err);
    container.innerHTML = `<div class="alert alert-danger text-center">Failed to load jobs.</div>`;
  }

  function filterAndRenderJobs() {
    const term = searchInput.value;
    // שדות שרלוונטיים לחיפוש
    const filtered = filterItems(jobs, term, [
      "title",
      "description",
      "skills"
      // אפשר להוסיף עוד שדות (כמו 'location' אם יש לך אותו באובייקט ולא רק id)
    ]);

    // מסנן גם לפי שם המיקום האנושי (למשל Tel Aviv)
    const moreFiltered = filtered.filter(job =>
      !term ||
      (LOCATION_MAP[job.location_id] && LOCATION_MAP[job.location_id].toLowerCase().includes(term.toLowerCase())) ||
      filtered.includes(job)
    );

    renderJobs(moreFiltered);
  }

  function renderJobs(jobsToRender) {
    container.innerHTML = "";
    if (!jobsToRender.length) {
      noResults.classList.remove("d-none");
      return;
    }
    noResults.classList.add("d-none");
    jobsToRender.forEach(job => {
      const card = createJobCard(job, { LOCATION_MAP });
      container.appendChild(card);
    });
  }
});
