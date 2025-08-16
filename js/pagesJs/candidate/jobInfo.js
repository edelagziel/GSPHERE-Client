document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const jobTitle = params.get("title"); // ✅ כאן השם תואם ל־URL
  
    if (jobTitle) {
      document.getElementById("position-title").textContent = `Candidates for "${jobTitle}"`;
      document.getElementById("position-name").textContent = jobTitle;
    }
  });
  