document.addEventListener("DOMContentLoaded", () => {
    // שאר קוד העלאת הקבצים שלך כאן...
  
    // טעינת פרטי המשתמש
    loadProfile();
  
    async function loadProfile() {
      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/profile`, {
          method: "GET",
          credentials: "include"
        });
  
        if (!res.ok) {
          // אם המשתמש לא התחבר, או שאין פרופיל שמור
          console.warn("No profile data found");
          return;
        }
  
        const data = await res.json();
        const profile = data.profile;
  
        // מלא את השדות בדף
        document.getElementById("profile-picture").src = profile.profile_picture_url || "https://plus.unsplash.com/premium_photo-1677094310956-7f88ae5f5c6b?q=80&w=1160&auto=format&fit=crop";
        document.querySelector("textarea").value = profile.bio || "";
        document.querySelector("input[placeholder='Your location']").value = profile.location || "";
        document.querySelector("input[placeholder='Your experience']").value = profile.experience || "";
        document.querySelector("input[placeholder='Your website']").value = profile.website_url || "";
        document.querySelector("input[placeholder='GitHub profile']").value = profile.github_url || "";
        document.querySelector("input[placeholder='LinkedIn profile']").value = profile.linkedin_url || "";
  
        // קובץ קורות חיים (אם יש)
        const cvFilenameInput = document.getElementById("cv-filename");
        if (cvFilenameInput) {
          if (profile.cv_url) {
            const urlParts = profile.cv_url.split("/");
            cvFilenameInput.value = urlParts[urlParts.length - 1];
            // אופציונלי: שמור גם את ה־URL בגלובל או dataset אם תרצה קישור להורדה
          } else {
            cvFilenameInput.value = "No file selected";
          }
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    }
  });
  