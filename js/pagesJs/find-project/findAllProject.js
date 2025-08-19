import { ShowAllProjectCard } from "../../cards/findProject.card.js";
import { setupJoinProjectButton } from "../../buttons/Join.Member.js";
import { setupEnterProjectButton } from "../../buttons/more-info-btn.js";


document.addEventListener("DOMContentLoaded", function () {
  // טען פרויקטים
  fetch(`${CONFIG.API_BASE_URL}/projects/`, {
    method: "GET",
    credentials: "include"
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.error || "Failed to fetch projects");
        });
      }
      return response.json();
    })
    .then(projects => {
      const container = document.getElementById("projectCardsContainer");
      if (!container) {
        console.error("No container with id 'projectCardsContainer' found in the HTML.");
        return;
      }
      if (!projects || !Array.isArray(projects.projects) || projects.projects.length === 0) {
        container.innerHTML = "";
        const noResultsDiv = document.getElementById("no-results");
        if (noResultsDiv) {
          noResultsDiv.classList.remove("d-none");
        }
        return;
      }

      const projectList = projects.projects;
      container.innerHTML = ""; // נקה לפני הוספת כרטיסים
      projectList.forEach(project => {
        const cardHtml = ShowAllProjectCard(project);
        container.insertAdjacentHTML('beforeend', cardHtml);
      });
    })
    .catch(error => {
      console.error("Error fetching projects:", error);
      const container = document.getElementById("error-message");
      if (container) {
        container.innerHTML = "<p>Error loading projects.</p>";
      }
    });

  // קריאה לפונקציה שמאזינה לכפתורי "Join"
  setupJoinProjectButton();
  setupEnterProjectButton();
});
