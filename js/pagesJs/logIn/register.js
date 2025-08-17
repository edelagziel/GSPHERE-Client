document.getElementById("registerForm").onsubmit = (e) => {
  e.preventDefault();

  const registerBtn = document.getElementById("registerBtn");
  setButtonLoading(registerBtn, true, "Registering...");

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // בדיקה: האם הסיסמאות תואמות
  if (data.password !== data.confirmPassword) {
    showMessage('danger', 'Passwords do not match', 4000);
    setButtonLoading(registerBtn, false);
    return;
  }

  delete data.confirmPassword; // לא שולחים לשרת

  showMessage('info', 'Registering...');

  fetch(`${CONFIG.API_BASE_URL}/auth/register`, 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  )
  .then((res) => {
    if (!res.ok) {
      return res.json().then(err => {
        throw new Error(err.message || "Registration failed");
      });
    }
    return res.json();
  })
  .then((result) => {
    showMessage('success', 'Registered successfully! Redirecting to login...');
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1500);
  })
  .catch((err) => {
    showMessage('danger', "Registration error: " + err.message, 4000);
  })
  .finally(() => {
    setButtonLoading(registerBtn, false);
  });
};
