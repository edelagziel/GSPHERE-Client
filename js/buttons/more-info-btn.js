export function setupEnterProjectButton() {
    document.addEventListener("click", function (e) 
    {
      const btn = e.target.closest(".more-info-btn");
      if (!btn) return;
      const projectId = btn.dataset.id;
      if (!projectId) return;
      window.location.href = `ProjectShowPage.html?projectId=${projectId}`;
    });
  }
  