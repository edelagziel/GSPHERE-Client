window.addEventListener("DOMContentLoaded", function () {
    const role = localStorage.getItem("role");
    const sidebarPath =
      role == 2
        ? "../Compponenet/recruiter.sidebar.html"
        : "../Compponenet/sidebar.html";
    fetch(sidebarPath)
      .then((res) => res.text())
      .then((html) => {
        document.getElementById("sidebar-placeholder").innerHTML = html;
  
        // כאן בטוח שה־sidebar נטען, עכשיו אפשר לשים את ה־event לכפתור!
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", function () {
            fetch("https://gsphere-server.onrender.com/api/auth/logout", {
              method: "POST",
              credentials: "include"
            })
              .then(res => {
                window.location.href = "../index.html";
              })
              .catch(err => {
                window.location.href = "../index.html";
              });
          });
        }
      });
  });
  