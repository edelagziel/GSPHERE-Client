
// Set recruiter name from localStorage if available
document.addEventListener("DOMContentLoaded", function() 
{
  const name = localStorage.getItem("fullname");
  if (name) {
    document.getElementById("recruiter-name").textContent = name;
  }
});
