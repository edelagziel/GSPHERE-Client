// js/jobs/update.job.js

  window.addEventListener("DOMContentLoaded", async () => {
    const jobId = getJobIdFromUrl();
    if (!jobId) {
      alert("Job ID is missing from URL");
      return;
    }
  
    const form = document.getElementById("updateJobForm");
    const resultDiv = document.getElementById("job-result");
  
    // שליפה ראשונית של פרטי המשרה
    try 
    {
      const res = await fetch(`${CONFIG.API_BASE_URL}/jobs/${jobId}`, {
        method: "GET",
        credentials: "include"
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch job");
  
      const job = data.job;
  
      form.elements["title"].value = job.title ?? "";
      form.elements["description"].value = job.description ?? "";
  
      if (job.deadline) {
        const dateOnly = new Date(job.deadline).toISOString().split("T")[0];
        form.elements["deadline"].value = dateOnly;
      }
  
    } catch (err) {
      console.error("Error loading job:", err);
      resultDiv.innerHTML = `<div class="alert alert-danger">Failed to load job data.</div>`;
    }
  
    // שליחת עדכון ב־submit
    form.onsubmit = async (e) => {
      e.preventDefault();
  
      const updatedData = {
        title: form.elements["title"].value.trim(),
        description: form.elements["description"].value.trim(),
        deadline: form.elements["deadline"].value.trim()
      };
  
      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/jobs/${jobId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(updatedData)
        });
  
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update job");
  
        resultDiv.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
        setTimeout(() => {
            window.location.href = `recruiter.html`;
          }, 1500);

      } 
      catch (err) 
      {
        console.error("Update error:", err);
        resultDiv.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
      }
    };
  });

  
  function getJobIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("jobId");
  }
  