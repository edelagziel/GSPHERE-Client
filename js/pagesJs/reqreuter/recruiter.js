import { getSkills } from "../../data/skillsService.js";
import { createJobCard } from "../../cards/Reqruter.jobCard.js";
import "../../buttons/Page.seeCandidatesButton.js";
import { setupDeleteJobButton } from "../../buttons/deleteJobButton.js";

// סטטוסים
const STATUS_MAP = {
  1: "Open",
  2: "Interviewing",
  3: "Closed"
};

// מיקומים
const LOCATION_MAP = {
  1: "Remote",
  2: "Tel Aviv",
  3: "Jerusalem",
  4: "Haifa",
  5: "Other"
};

window.addEventListener("DOMContentLoaded", async () => {
  // הצגת שם המגייס
  const name = localStorage.getItem("fullname");
  const nameSpan = document.getElementById("recruiter-name");
  if (name && nameSpan) nameSpan.textContent = name;

  // קונטיינר של המשרות
  const container = document.getElementById("job-list");
  container.innerHTML = `<div class="text-center text-muted py-3">Loading jobs...</div>`;

  try {
    // מיפוי כישורים פעם אחת
    const skillsArr = await getSkills(); // [{id, name}, ...]
    const skillsMap = new Map(skillsArr.map(s => [Number(s.id), s.name]));

    // שליפת משרות של המגייס
    const res = await fetch(`${CONFIG.API_BASE_URL}/jobs/my`, { credentials: "include" });
    const data = await res.json();
    const jobs = data.jobs || data.job || [];

    container.innerHTML = "";
    if (!Array.isArray(jobs) || jobs.length === 0) {
      container.innerHTML = `<div class="alert alert-info text-center">No job postings yet.</div>`;
      return;
    }

    // יצירת כרטיסים
    const frag = document.createDocumentFragment();
    for (const job of jobs) {
      const card = createJobCard(job, { skillsMap, STATUS_MAP, LOCATION_MAP });

      // חיבור כפתור מחיקה
      const deleteBtn = card.querySelector(".delete-job-btn");
      if (deleteBtn) setupDeleteJobButton(deleteBtn);

      frag.appendChild(card);
    }

    container.appendChild(frag);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    container.innerHTML = `<div class="alert alert-danger text-center">Failed to load jobs.</div>`;
  }
});

// האזנה לכפתור עדכון משרה
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".update-job-btn");
  if (btn) {
    const jobId = btn.getAttribute("data-id");
    if (jobId) {
      window.location.href = `update.job.html?jobId=${jobId}`;
    }
  }
});
