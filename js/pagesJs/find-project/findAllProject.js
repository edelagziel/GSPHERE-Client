import { ShowAllProjectCard } from "../../cards/findProject.card.js";
import { setupJoinProjectButton } from "../../buttons/Join.Member.js";
import { setupEnterProjectButton } from "../../buttons/more-info-btn.js";
import { filterItems } from "../../jobs/searchBar.js"; // ודא שהנתיב נכון!

let projectList = [];

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("projectCardsContainer");
  const noResultsDiv = document.getElementById("no-results");
  const errorMsg = document.getElementById("error-message");
  const searchInput = document.getElementById("search-input");
  const searchForm = document.getElementById("search-form");

  // --- טען את כל הפרויקטים מהשרת והצג
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
      if (!projects || !Array.isArray(projects.projects) || projects.projects.length === 0) {
        container.innerHTML = "";
        noResultsDiv.classList.remove("d-none");
        return;
      }
      projectList = projects.projects;
      renderProjects(projectList);
    })
    .catch(error => {
      console.error("Error fetching projects:", error);
      if (errorMsg) {
        errorMsg.innerHTML = "<p>Error loading projects.</p>";
        errorMsg.classList.remove("d-none");
      }
    });

  // --- פונקציה שמציגה את כל הפרויקטים הנתונים
  function renderProjects(projectsToRender) {
    container.innerHTML = "";
    if (!projectsToRender.length) {
      noResultsDiv.classList.remove("d-none");
      return;
    }
    noResultsDiv.classList.add("d-none");
    projectsToRender.forEach(project => {
      const cardHtml = ShowAllProjectCard(project);
      container.insertAdjacentHTML('beforeend', cardHtml);
    });
    // מריץ מחדש את כל הכפתורים אחרי כל רנדר
    setupJoinProjectButton();
    setupEnterProjectButton();
  }

  // --- סינון וחיפוש
  function filterAndRenderProjects() {
    const term = searchInput.value;
    const filtered = filterItems(projectList, term, [
      "title",        // שם הפרויקט
      "description",  // תיאור
      "stage_name",   // שלב
      "first_name",   // בעלים
      "last_name"     // בעלים
      // תוכל להוסיף שדות נוספים אם יש לך (למשל תגיות)
    ]);
    renderProjects(filtered);
  }

  // חיפוש בזמן הקלדה
  searchInput.addEventListener("input", filterAndRenderProjects);

  // חיפוש גם בלחיצה על Search
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    filterAndRenderProjects();
  });
});
