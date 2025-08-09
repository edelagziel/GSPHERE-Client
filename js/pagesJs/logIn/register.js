// /js/register.js

document.getElementById("registerForm").onsubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // בדיקה: האם הסיסמאות תואמות
  if (data.password !== data.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  delete data.confirmPassword; // לא שולחים לשרת

  console.log("Sending data to server:", data);

  fetch(`${CONFIG.API_BASE_URL}/auth/register`, 
    {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    console.log(" Raw response:", res);
    if (!res.ok) {
      return res.json().then(err => {
        console.error("Server error response:", err);
        throw new Error(err.message || "Registration failed");
      });
    }
    return res.json();
  })
  .then((result) => {
    console.log("Success response from server:", result);
    alert("Registered successfully!");
    window.location.href = "../index.html";
  })
  .catch((err) => {
    console.error("Registration error:", err);
    alert("Registration error: " + err.message);
  });
};
