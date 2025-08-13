// ../js/create.job.js
import { getSkills } from "../data/skillsService.js";

document.addEventListener("DOMContentLoaded", async () => {
  const skillsDiv = document.getElementById("skills-list");
  const jobResult = document.getElementById("job-result");

  // טען את הסקילס דרך שירות חכם עם localStorage
  try {
    const skills = await getSkills();

    // ייצור צ'קבוקסים
    skillsDiv.innerHTML = skills.map(skill =>
      `<div class="form-check form-check-inline mb-1">
        <input class="form-check-input" type="checkbox" id="skill${skill.id}" value="${skill.id}" name="skills" />
        <label class="form-check-label" for="skill${skill.id}">${skill.name}</label>
      </div>`
    ).join("");
  } catch (err) {
    console.error("Error loading skills:", err);
    skillsDiv.innerHTML = `<span class='text-danger'>Failed to load skills</span>`;
  }

  // שליחת טופס יצירת משרה
  document.getElementById("createJobForm").onsubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const skillIds = Array.from(form.querySelectorAll("input[name=skills]:checked")).map(cb => Number(cb.value));

    const data = 
    {

      bio: form.querySelector("textarea").value,
      cv_url: form.querySelector("input[placeholder*='CV']").value,
      location: form.querySelector("input[placeholder='Your location']").value,
      experience: form.querySelector("input[placeholder='Your experience']").value,
      profile_picture_url: profilePicture?.src || "",
      website_url: form.querySelector("input[placeholder='Your website']").value,
      github_url: form.querySelector("input[placeholder='GitHub profile']").value,
      linkedin_url: form.querySelector("input[placeholder='LinkedIn profile']").value
    };

    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/jobs`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        jobResult.innerHTML = `<span class="text-success">Job created successfully!</span>`;
        setTimeout(() => window.location.href = "recruiter.html", 1500);
      } else {
        jobResult.innerHTML = `<span class="text-danger">${result.error || "Failed to create job."}</span>`;
      }
    } catch (err) {
      console.error("Server error:", err);
      jobResult.innerHTML = `<span class="text-danger">Server error. Try again later.</span>`;
    }
  };
});
