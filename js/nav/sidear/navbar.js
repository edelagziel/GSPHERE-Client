window.addEventListener("DOMContentLoaded", function () {
  fetch("../Compponenet/navbar.html")
    .then(response => response.text())
    .then(html => {
      const placeholder = document.getElementById("navbar-placeholder");
      if (placeholder) {
        placeholder.innerHTML = html;

        // 👇 אתחול רכיבי Bootstrap דינמיים (כולל collapse/burger!)
        setTimeout(() => {
          document.querySelectorAll('.collapse').forEach(c => {
            if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
              // יאתחל את כל האלמנטים שנטענו עכשיו
              new bootstrap.Collapse(c, { toggle: false });
            }
          });
        }, 0);

        // טיפול בלחיצה על הלוגו (אחרי שה-HTML הוזרק)
        const logo = document.querySelector(".Nav-GSPHERE-logo");
        if (logo) {
          logo.addEventListener("click", () => {
            const role = localStorage.getItem("role");
            if (role === "2") {
              // Recruiter
              window.location.href = "../page/recruiter.html";
            } else {
              // Regular user or missing role
              window.location.href = "../page/project.html";
            }
          });
        }
      }
    })
    .catch(err => {
      console.error("Failed to load navbar:", err);
    });
});
