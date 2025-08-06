export function setupUpdateProjectButton() 
{
  document.addEventListener("click", function(e)
   {
    e.preventDefault();
    const btn = e.target.closest(".update-btn");
    console.log(btn);
    if (btn)
     {
      const projectId = btn.getAttribute("data-id");
      window.location.href = `update.project.html?projectId=${projectId}`;
    }
  });
}







