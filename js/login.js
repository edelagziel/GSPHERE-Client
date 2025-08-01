document.getElementById("loginForm").onsubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries()); 
  
    console.log("Sending login request:", data);
  
    fetch("https://gsphere-server.onrender.com/api/auth/logIn", 
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", 
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log("Raw login response:", res);
        if (!res.ok) {
          return res.json().then(err => {
            console.error("Login server error:", err);
            throw new Error(err.message || "Login failed");
          });
        }
        return res.json();
      })
      .then(result => {
        console.log("Login successful:", result);
        alert("Login successful!");
        window.location.href = "page/project.html";
      })
      .catch(err => {
        console.error("Login error:", err);
        alert("Login error: " + err.message);
      });
  };