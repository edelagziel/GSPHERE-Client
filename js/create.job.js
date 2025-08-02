// ../js/create.job.js

document.addEventListener("DOMContentLoaded", async () => {
    const skillsDiv = document.getElementById("skills-list");
    const jobResult = document.getElementById("job-result");
  
    // טען את כל הסקילס מהשרת (עדיף absolute URL בפרודקשן)
    try {
      const res = await fetch("https://gsphere-server.onrender.com/api/jobs/skills", {
        credentials: "include"
      });
      const data = await res.json();
      const skills = data.skills || [];
      // ייצור צ'קבוקס לכל סקיל
      skillsDiv.innerHTML = skills.map(skill =>
        `<div class="form-check form-check-inline mb-1">
          <input class="form-check-input" type="checkbox" id="skill${skill.id}" value="${skill.id}" name="skills" />
          <label class="form-check-label" for="skill${skill.id}">${skill.name}</label>
        </div>`
      ).join("");
    } catch (err) {
      skillsDiv.innerHTML = `<span class='text-danger'>Failed to load skills</span>`;
    }
  
    // שליחת טופס יצירת משרה
    document.getElementById("createJobForm").onsubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
  
      // אוסף את כל ה־skills שנבחרו
      const skillIds = Array.from(form.querySelectorAll("input[name=skills]:checked")).map(cb => Number(cb.value));
  
      // בנה אובייקט נתונים לשליחה
      const data = {
        title: form.title.value,
        description: form.description.value,
        status_id: form.status_id.value,
        location_id: form.location_id.value,
        deadline: form.deadline.value,
        skills: skillIds
      };
  
      // שלח לשרת
      try {
        const res = await fetch("https://gsphere-server.onrender.com/api/jobs", {
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
        jobResult.innerHTML = `<span class="text-danger">Server error. Try again later.</span>`;
      }
    };
  });
  