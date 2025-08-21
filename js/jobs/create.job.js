// /js/jobs/create.job.js
import { getSkills } from "../data/skillsService.js";

document.addEventListener("DOMContentLoaded", async () => {
  const skillsDiv  = document.getElementById("skills-list");
  const jobResult  = document.getElementById("job-result");
  const form       = document.getElementById("createJobForm");

  // טען סקילס ובנה צ'קבוקסים
  try {
    const skills = await getSkills(); // נטען משרת/LocalStorage בשירות שלך
    skillsDiv.innerHTML = skills.map(s => `
      <div class="form-check form-check-inline mb-1">
        <input class="form-check-input" type="checkbox" id="skill${s.id}" value="${s.id}" name="skills">
        <label class="form-check-label" for="skill${s.id}">${s.name}</label>
      </div>
    `).join("");
  } catch (err) {
    console.error("Error loading skills:", err);
    skillsDiv.innerHTML = `<span class="text-danger">Failed to load skills</span>`;
  }

  // שליחת טופס יצירת משרה
  form.onsubmit = async (e) => {
    e.preventDefault();

    const pickedSkills = [...form.querySelectorAll('input[name="skills"]:checked')]
      .map(cb => Number(cb.value));

    const data = {
      title:        form.elements["title"]?.value.trim()        || "",
      description:  form.elements["description"]?.value.trim()  || "",
      status_id:    Number(form.elements["status_id"]?.value ?? 0),
      location_id:  Number(form.elements["location_id"]?.value ?? 0),
      deadline:     form.elements["deadline"]?.value.trim()     || "",
      skills:       pickedSkills
    };

    // ולידציה בסיסית לפני שליחה
    if (!data.title || !data.description || !data.deadline) {
      jobResult.innerHTML = `<div class="alert alert-warning">Please fill all required fields.</div>`;
      return;
    }

    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/jobs`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result.error || `Failed to create job (${res.status})`);
      }

      jobResult.innerHTML = `<div class="alert alert-success">Job created successfully!</div>`;
      setTimeout(() => window.location.href = "recruiter.html", 1500);

    } catch (err) {
      console.error("Server error:", err);
      jobResult.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
    }
  };
});
