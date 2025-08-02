// recruiter.js

// מיפוי סטטוסים ומיקומים - תוכל להחליף ל-fetch מהשרת בעתיד
const jobStatuses = { 1: "Open", 2: "Interviewing", 3: "Closed" };
const locations = { 1: "Remote", 2: "Tel Aviv", 3: "Jerusalem", 4: "Haifa", 5: "Other" };

// נטען קודם את רשימת הכישורים ונבנה מיפוי id -> name
let skillsMap = {};

async function fetchSkillsMap() {
  try {
    const res = await fetch("https://gsphere-server.onrender.com/api/jobs/skills", {
      credentials: "include"
    });
    const data = await res.json();
    // בדוק מה פורמט התשובה שלך: data.skills או data (אם זה מערך)
    const skills = data.skills || data;
    skills.forEach(skill => {
      skillsMap[skill.id] = skill.name;
    });
  } catch (err) {
    console.error("Failed to fetch skills", err);
  }
}

window.onload = async () => {
  // הצגת שם המגייס
  const name = localStorage.getItem("fullname");
  if (name) {
    const nameSpan = document.getElementById("recruiter-name");
    if (nameSpan) nameSpan.textContent = name;
  }

  // טען קודם את המפה של הכישורים
  await fetchSkillsMap();

  // טען את המשרות מהשרת
  const container = document.getElementById("job-list");
  container.innerHTML = `<div class="text-center text-muted py-3">Loading jobs...</div>`;

  try {
    const res = await fetch("https://gsphere-server.onrender.com/api/jobs/my", {
      method: "GET",
      credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to fetch jobs");
    const data = await res.json();
    const jobs = data.job || [];

    container.innerHTML = ""; // ננקה לפני הצגה

    if (jobs.length === 0) {
      container.innerHTML = `<div class="alert alert-info text-center">No job postings yet.</div>`;
      return;
    }

    // הצגה של כל משרה (קלף Bootstrap)
    jobs.forEach(job => {
      // תאריך יצירה + דדליין בפורמט קריא
      const createdAt = job.created_at
        ? new Date(job.created_at).toLocaleDateString()
        : "Unknown";
      const deadline = job.deadline
        ? new Date(job.deadline).toLocaleDateString()
        : "No deadline";

      // המרת IDs לשמות של skills
      const skillNames = Array.isArray(job.skills)
        ? job.skills.map(id => skillsMap[id]).filter(Boolean).join(", ")
        : "—";

      // הוספת קלף משרה
      container.innerHTML += `
        <div class="card mb-3 shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-2">${job.title}</h5>
            <p class="card-text mb-2">${job.description || ''}</p>
            <ul class="list-unstyled mb-2">
              <li><strong>Status:</strong> ${jobStatuses[job.status_id] || job.status_id}</li>
              <li><strong>Location:</strong> ${locations[job.location_id] || job.location_id}</li>
              <li><strong>Skills:</strong> ${skillNames}</li>
              <li><strong>Deadline:</strong> ${deadline}</li>
            </ul>
            <p class="text-muted mb-0" style="font-size:0.9em;">Created at: ${createdAt}</p>
          </div>
        </div>
      `;
    });

  }
  catch (err) {
    container.innerHTML = `<div class="alert alert-danger text-center">Failed to load jobs.</div>`;
    console.error("Error fetching jobs:", err);
  }
};
