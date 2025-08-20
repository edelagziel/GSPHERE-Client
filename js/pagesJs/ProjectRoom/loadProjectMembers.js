// js/pagesJs/ProjectRoom/loadProjectMembers.js


  // מייבאים את כרטיס החבר
  import { createProjectMemberCard } from "../../cards/projectMemberCard.js";
  
export async function loadProjectMembers(projectId, membersContainer) {
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/projects/${projectId}/members`, {
        method: "GET",
        credentials: "include"
      });
  
      if (!res.ok) throw new Error("Failed to fetch project members");
  
      const { members } = await res.json();
      membersContainer.innerHTML = "";
  
      if (!Array.isArray(members) || members.length === 0) {
        membersContainer.innerHTML = `<div class="col-12"><div class="alert alert-info text-center">No members found for this project.</div></div>`;
        return;
      }
  
      members.forEach(member => {
        membersContainer.insertAdjacentHTML("beforeend", createProjectMemberCard(member, projectId));
      });
    } catch (err) {
      membersContainer.innerHTML = `<div class="col-12"><div class="alert alert-danger text-center">${err.message}</div></div>`;
    }
  }
  

  