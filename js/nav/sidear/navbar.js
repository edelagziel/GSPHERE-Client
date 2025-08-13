window.addEventListener("DOMContentLoaded", function () {
  fetch("../Compponenet/navbar.html")
    .then(response => response.text())
    .then(html => 
      {
      const placeholder = document.getElementById("navbar-placeholder");
      if (placeholder) 
      {
        placeholder.innerHTML = html;

        // רק אחרי שה־navbar נטען – מוסיפים את ההאזנה ללחיצה על הלוגו
        const logo = document.querySelector(".Nav-GSPHERE-logo");
        if (logo) {
          logo.addEventListener("click", () =>
          {
            const role = localStorage.getItem("role");

            if (role === "2") 
            {
              // Recruiter
              window.location.href = "../page/recruiter.html";
            } 
            else 
            {
              // Regular user or missing role
              window.location.href = "../page/project.html";
            }
          });
        }
      }
    })
    .catch(err => 
    {
      console.error("Failed to load navbar:", err);
    });
});
