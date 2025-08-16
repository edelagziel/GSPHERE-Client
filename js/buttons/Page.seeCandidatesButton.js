document.addEventListener("click", (e) => {
    const btn = e.target.closest(".see-candidates-btn");
    if (!btn) return;
  
    const jobId = btn.dataset.id;
    const jobTitle = btn.dataset.title; // נניח ששמרת data-title בכפתור
    if (!jobId) return;
  
    // מקודדים את שם המשרה כדי למנוע בעיות עם רווחים ותווים
    window.location.href = `all.Candidates.html?jobId=${jobId}&title=${encodeURIComponent(jobTitle)}`;
  });
  