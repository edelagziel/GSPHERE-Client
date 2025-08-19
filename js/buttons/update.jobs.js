document.addEventListener("click", function (e) {
    const btn = e.target.closest(".update-job-btn");
    if (btn) {
      const jobId = btn.getAttribute("data-id");
      if (jobId) {
        window.location.href = `update.job.html?jobId=${jobId}`;
      }
    }
  });
  