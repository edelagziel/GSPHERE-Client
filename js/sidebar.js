// sidebar.js
window.addEventListener("DOMContentLoaded", function() 
{
    fetch("../Compponenet/sidebar.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("sidebar-placeholder").innerHTML = html;
      });
  });
  


  document.getElementById("logoutBtn").addEventListener("click", function() 
  {
    fetch("https://gsphere-server.onrender.com/api/auth/logout", 
    {
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
  