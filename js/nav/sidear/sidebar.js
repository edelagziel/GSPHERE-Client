window.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const sidebarPath = role == 2
    ? "../Compponenet/recruiter.sidebar.html"
    : "../Compponenet/sidebar.html";

  fetch(sidebarPath)
    .then(res => res.text())
    .then(html => {
      document.getElementById("sidebar-placeholder").innerHTML = html;

      // <<< חייב כאן, אחרי ההחדרה
      highlightActiveLink();

      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          fetch(`${CONFIG.API_BASE_URL}/auth/logout`, { method: "POST", credentials: "include" })
            .finally(() => location.href = "../index.html");
        });
      }
    });
});

function highlightActiveLink() {
  const current = location.pathname.split('/').pop().toLowerCase();
  document.querySelectorAll('#sidebar-placeholder .nav-link').forEach(a => {
    const page = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
    a.classList.toggle('active', page === current);
    a.classList.toggle('link-dark', page !== current);
  });
}
