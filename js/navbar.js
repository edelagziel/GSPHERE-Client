window.addEventListener("DOMContentLoaded", function() {
  fetch("../Compponenet/navbar.html")
    .then(response => response.text())
    .then(html => {
      const placeholder = document.getElementById("navbar-placeholder");
      if (placeholder) {
        placeholder.innerHTML = html;
      }
    });
});
