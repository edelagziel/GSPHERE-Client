export function setupUpdateProjectButton() 
{
  document.addEventListener("click", function(e)
   {
    const btn = e.target.closest(".update-btn");
    if (btn)
     {
      const projectId = btn.getAttribute("data-id");
      window.location.href = `update.project.html?id=${projectId}`;
    }
  });
}







