document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const profilePicture = document.getElementById("profile-picture");
  
    form.onsubmit = async function (e) {
      e.preventDefault();
  
      alert(document.getElementById("profile-picture")?.src )
      const profileData = {
        bio: form.querySelector("textarea").value,
        cv_url: form.querySelector("input[placeholder*='CV']").value,
        location: form.querySelector("input[placeholder='Your location']").value,
        experience: form.querySelector("input[placeholder='Your experience']").value,
        profile_picture_url: document.getElementById("profile-picture")?.src,
        website_url: form.querySelector("input[placeholder='Your website']").value,
        github_url: form.querySelector("input[placeholder='GitHub profile']").value,
        linkedin_url: form.querySelector("input[placeholder='LinkedIn profile']").value
      };
  
      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(profileData)
        });
  
        const contentType = res.headers.get("content-type") || "";
  
        if (!res.ok) {
          const errMsg = contentType.includes("application/json")
            ? (await res.json()).message
            : await res.text();
          throw new Error(errMsg || "Profile update failed");
        }
  
        const result = await res.json();
        alert("Profile updated successfully!");
      } catch (err) {
        console.error("Error updating profile:", err);
        alert("Failed to update profile: " + err.message);
      }
    };
  });
  