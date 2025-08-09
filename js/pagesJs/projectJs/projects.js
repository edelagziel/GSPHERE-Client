import { stages, visibilities } from '../../data/projectEnums.js';
import { createProjectCard } from '../../cards/project.card.js'; 
import { setupEnterProjectButton  } from '../../buttons/enterProject.js';
import { setupLeaveProjectButton } from '../../buttons/leaveProject.js';
import { setupShowMoreButton  } from '../../buttons/showMore.js';
import{setupUpdateProjectButton}from '../../buttons/update-btn.js'


window.onload = () => 
  {
    const name = localStorage.getItem("fullname");
    if (name)
      {
      const welcomeDiv = document.getElementById("welcome-user");
      if (welcomeDiv)
        welcomeDiv.innerHTML = `<h5>Welcome, <span class="text-primary">${name}</span>!</h5>`;
    }


    fetch(`${CONFIG.API_BASE_URL}/projects/mine`,
    {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => 
        {
            const projects = data.projects || [];
            const container = document.getElementById("projects-row");
            const noProjects = document.getElementById("no-projects");
            container.innerHTML = "";

          if (projects.length === 0)
              {
                if (noProjects) noProjects.classList.remove("d-none");
                return;
              }
            else 
              {
                  if (noProjects) noProjects.classList.add("d-none");
              }

          projects.forEach((project) => 
            {
              const col = document.createElement("div");
              col.className = "col-sm-10 col-md-6 col-lg-4 mb-4 d-flex";

            // --- תאריך קריא
            const createdAt = project.created_at
              ? new Date(project.created_at).toLocaleDateString()
              : "Unknown date";

            // --- טקסטים של stage/visibility
            const stageText = stages[project.stage_id] || "Unknown stage";
            const visibilityText = visibilities[project.visibility_id] || "Unknown";

            // --- תמונה
            const imgUrl = (project.image_url && project.image_url.trim() !== "")
              ? project.image_url
              : "https://unsplash.com/photos/black-and-blue-laptop-computer-bGWVhFY1gH0";
            const imageHtml = `
              <img src="${imgUrl}"
                class="card-img-top"
                style="max-height:200px; object-fit:cover;"
                alt="Project Image"
                onerror="this.onerror=null;this.src='https://unsplash.com/photos/black-and-blue-laptop-computer-bGWVhFY1gH0';">
            `;

            col.innerHTML = createProjectCard(project, stageText, visibilityText, createdAt, imageHtml);  
            container.appendChild(col);

            setupAllProjectButtons();

          });
        })
      .catch((err) => 
      {
        document.getElementById("projects-row").innerHTML =
          "<p class='text-danger'>Failed to load projects.</p>";
      });
};





function setupAllProjectButtons()
{
  setupShowMoreButton();
  setupEnterProjectButton();
  setupLeaveProjectButton();
  setupUpdateProjectButton();
}

