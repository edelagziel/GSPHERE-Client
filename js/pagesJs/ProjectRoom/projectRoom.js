import { loadProjectMembers } from "./loadProjectMembers.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("projectId");
  const membersContainer = document.getElementById("project-members-list");
  if (projectId && membersContainer) loadProjectMembers(projectId, membersContainer);
});

// אין צורך לייבא את projectMemberRoleChange.js — הוא מאזין גלובלי
