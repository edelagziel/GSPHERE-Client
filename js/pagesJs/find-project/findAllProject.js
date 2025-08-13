import { ShowAllProjectCard } from "../../cards/findProject.card.js"

document.addEventListener("DOMContentLoaded", function()
 {
    fetch(`${CONFIG.API_BASE_URL}/projects/`, 
    {
        method: "GET",
        credentials: "include"
    })
        .then(response => 
        {
            if (!response.ok) 
            {
                return response.json().then(err => 
                {
                    // Try to show server error message if available
                    throw new Error(err.error);
                });
            }
            return response.json();
        })
        .then(projects => 
        {
            const container = document.getElementById("projectCardsContainer");
            if (!container)
            {
                console.error("No container with id 'projectCardsContainer' found in the HTML.");
                return;
            }
            // The server now returns { message: "...", projects: [...] }
            if (!projects || !Array.isArray(projects.projects) || projects.projects.length === 0) 
            {
                container.innerHTML = "";
                const noResultsDiv = document.getElementById("no-results");
                if (noResultsDiv) 
                {
                    noResultsDiv.classList.remove("d-none");
                }
                return;
            }
            
            const projectList = projects.projects;
            projectList.forEach(project => {
                const cardHtml = ShowAllProjectCard(project);
                container.insertAdjacentHTML('beforeend', cardHtml);
            });
        })

        .catch(error => 
        {
            console.error("Error fetching projects:", error);
            const container = document.getElementById("error-message");
            if (container) 
            {
                container.innerHTML = "<p>Error loading projects.</p>";
            }
        });
});
