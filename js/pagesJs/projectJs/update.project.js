function getProjectIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("projectId");
}

document.getElementById("updateProjectForm").onsubmit = async function (e) {
  e.preventDefault();

  const projectId = getProjectIdFromUrl();
  if (!projectId) {
    alert("Project ID is missing!");
    return;
  }

  const formData = new FormData(e.target);
  // המרה לאובייקט פשוט
  const data = Object.fromEntries(formData.entries());
  console.log(data);

  // דוגמאות להמרות טיפוסים אם ה‑API מצפה למספרים/אינומים
  if ("stage" in data) data.stage = Number(data.stage);      // או להשאיר מחרוזת אם ככה ה‑API בנוי
  if ("visibility" in data) data.visibility = String(data.visibility);

  const msgDiv = document.getElementById("update-result");
  msgDiv.innerHTML = `<div class="alert alert-info">Updating…</div>`;

  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/projects/${projectId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // נסה לקרוא JSON, ואם לא — טקסט
    let result, raw;
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      result = await res.json();
    } else {
      raw = await res.text();
    }

    if (res.ok) {
      msgDiv.innerHTML = `<div class="alert alert-success">Project updated!</div>`;
      setTimeout(() => (window.location.href = "project.html"), 1200);
    } else {
      // הצג מידע מקסימלי לדיבאג
      const serverMsg = result?.error || result?.message || raw || "Unknown server error";
      msgDiv.innerHTML = `<div class="alert alert-danger">${serverMsg}</div>`;

      console.error("Update failed:", { status: res.status, statusText: res.statusText, result, raw, sent: data });
    }
  } catch (err) {
    console.error(err);
    msgDiv.innerHTML = `<div class="alert alert-danger">Network/parse error: ${err.message}</div>`;
  }
};
