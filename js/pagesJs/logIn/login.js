document.getElementById("loginForm").onsubmit = (e) => {
  e.preventDefault();

  // נועלים את הכפתור ומציגים אנימציית טעינה
  const loginBtn = document.getElementById("loginBtn");
  setButtonLoading(loginBtn, true, "Logging in...");

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  showMessage('info', 'Logging in...');

  fetch(`${CONFIG.API_BASE_URL}/auth/logIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          throw new Error(err.message || "Login failed");
        });
      }
      return res.json();
    })
    .then(result => {
      localStorage.setItem("fullname", result.fullname);
      localStorage.setItem("role", result.role);
      showMessage('success', 'Login successful! Redirecting...');
      setTimeout(() => {
        if (result.role == 2) {
          window.location.href = "../page/recruiter.html";
        } else {
          window.location.href = "../page/project.html";
        }
      }, 1200);
    })
    .catch(err => {
      showMessage('danger', "Login error: " + err.message, 4000);
    })
    .finally(() => {
      setButtonLoading(loginBtn, false);
    });
};
