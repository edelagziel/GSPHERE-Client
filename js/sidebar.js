// sidebar.js
window.addEventListener("DOMContentLoaded", function() 
{
    fetch("../Compponenet/sidebar.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("sidebar-placeholder").innerHTML = html;
      });
  });
  