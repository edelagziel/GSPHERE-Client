window.addEventListener("DOMContentLoaded", function () {
  fetch("../Compponenet/navbar.html")
    .then(response => response.text())
    .then(html => {
      const placeholder = document.getElementById("navbar-placeholder");
      if (placeholder) {
        placeholder.innerHTML = html;

        // טיפול בלחיצה על הלוגו (אחרי שה-HTML הוזרק)
        const logo = document.querySelector(".Nav-GSPHERE-logo");
        if (logo) {
          logo.addEventListener("click", () => {
            const role = localStorage.getItem("role");
            if (role === "2") {
              window.location.href = "../page/recruiter.html";
            } else {
              window.location.href = "../page/project.html";
            }
          });
        }

        // 👇 אתחול collapse *רק* בלחיצה על ההמבורגר!
        const burger = document.querySelector('.navbar-toggler');
        if (burger) {
          burger.addEventListener('click', () => {
            if (typeof bootstrap !== "undefined" && bootstrap.Collapse) {
              document.querySelectorAll('.collapse').forEach(c => {
                new bootstrap.Collapse(c, { toggle: false });
              });
            }
          });
        }
      }
    })
    .catch(err => {
      console.error("Failed to load navbar:", err);
    });
});
