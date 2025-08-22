window.addEventListener("DOMContentLoaded", function () {
  fetch("../Compponenet/navbar.html")
    .then(response => response.text())
    .then(html => {
      const placeholder = document.getElementById("navbar-placeholder");
      if (placeholder) {
        placeholder.innerHTML = html;

        // אתחול ראשוני (עדיין חשוב!)
        setTimeout(() => {
          document.querySelectorAll('.collapse').forEach(c => {
            if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
              new bootstrap.Collapse(c, { toggle: false });
            }
          });
        }, 0);

        // 👇 הוסף את זה - חגורת בטיחות!
        document.addEventListener("click", function (e) {
          const burger = document.querySelector('.navbar-toggler');
          if (burger && (e.target === burger || burger.contains(e.target))) {
            if (typeof bootstrap !== "undefined" && bootstrap.Collapse) {
              document.querySelectorAll('.collapse').forEach(c => {
                new bootstrap.Collapse(c, { toggle: false });
              });
            }
          }
        });

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
      }
    })
    .catch(err => {
      console.error("Failed to load navbar:", err);
    });
});
