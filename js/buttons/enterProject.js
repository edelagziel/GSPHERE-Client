export function setupEnterProjectButton() {
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".enter-btn");
    if (!btn) return;
    const projectId = btn.dataset.id;
    if (!projectId) return;
    window.location.href = `ProjectMember.html?projectId=${projectId}`;
  });
}
