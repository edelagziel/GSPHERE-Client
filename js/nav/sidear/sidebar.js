window.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const sidebarPath = role == 2
    ? "../Compponenet/recruiter.sidebar.html"
    : "../Compponenet/sidebar.html";

  fetch(sidebarPath)
    .then(res => res.text())
    .then(html => {
      document.getElementById("sidebar-placeholder").innerHTML = html;

      highlightActiveLink();
      copySidebarLinksToBurger();    // <<< יוצר תפריט בורגר דינמי

      // Logout בסיידבר
      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", logoutUser);
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

// --- הפונקציה שמייצרת את תפריט הבורגר במובייל ---
function copySidebarLinksToBurger() {
  const mobileList = document.getElementById("mobileNavList");
  const sidebarLinks = document.querySelectorAll('#sidebar-placeholder .sidebar-link');
  if (!mobileList) return;

  mobileList.innerHTML = "";

  // קישורי הסיידבר
  sidebarLinks.forEach(link => {
    const li = document.createElement("li");
    li.className = "nav-item";
    li.innerHTML = `<a class="nav-link" href="${link.getAttribute('href')}">${link.textContent}</a>`;
    mobileList.appendChild(li);
  });

  // מפריד בין קישורי סיידבר לגלובליים
  const divider = document.createElement("li");
  divider.innerHTML = '<hr class="dropdown-divider">';
  mobileList.appendChild(divider);

  // 👇 קישורים גלובליים – תמיד יהיו בבורגר
  const globalLinks = [
    { href: "../page/About.html",      text: "About" },
    { href: "../page/contact.html",    text: "Contact Info" },
    { href: "../page/future.html",     text: "What's Coming" },
  ];
  globalLinks.forEach(link => {
    const li = document.createElement("li");
    li.className = "nav-item";
    // אפשר להוסיף כאן classים לעיצוב, לדוג': nav-link fw-semibold text-white px-3
    li.innerHTML = `<a class="nav-link fw-semibold text-white px-3" href="${link.href}">${link.text}</a>`;
    mobileList.appendChild(li);
  });

  // כפתור Logout (רק במובייל)
  const logoutLi = document.createElement("li");
  logoutLi.className = "nav-item mt-2";
  logoutLi.innerHTML = `
    <a href="#" id="mobileLogoutBtn" class="btn btn-outline-danger fw-bold w-100" style="border-radius:0;">
      Logout
    </a>`;
  mobileList.appendChild(logoutLi);

  // האזנה ל־Logout במובייל
  document.getElementById("mobileLogoutBtn").addEventListener("click", function(e) {
    e.preventDefault();
    logoutUser();
  });
}

// פונקציה מאוחדת ל־Logout
function logoutUser() {
  fetch(`${CONFIG.API_BASE_URL}/auth/logout`, { method: "POST", credentials: "include" })
    .finally(() => location.href = "../index.html");
}
