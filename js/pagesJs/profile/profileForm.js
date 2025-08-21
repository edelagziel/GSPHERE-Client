import { uploadFile } from "./uploadFile.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const profileImgEl = document.getElementById("profile-picture");
  const profileFileInput = document.getElementById("file-input");
  const cvFileInput = document.getElementById("cv-file");
  const cvFilenameInput = document.getElementById("cv-filename");

  if (cvFileInput && cvFilenameInput) {
    cvFileInput.addEventListener("change", () => {
      const fileName = cvFileInput.files.length > 0
        ? cvFileInput.files[0].name
        : "No file selected";
      cvFilenameInput.value = fileName;
      alert(` CV file selected: ${fileName}`);
    });
  }

  form.onsubmit = async function (e) {
    e.preventDefault();

    let profile_picture_url = profileImgEl?.src || "";
    let cv_url = "";

    if (profileFileInput.files.length > 0) {
      try {
        profile_picture_url = await uploadFile(profileFileInput.files[0]);
      } catch (err) {
        alert(" Error uploading profile picture: " + err.message);
        return;
      }
    } 
   

    if (cvFileInput && cvFileInput.files.length > 0) {
      try {
        cv_url = await uploadFile(cvFileInput.files[0]);
      } catch (err) {
        return;
      }
    } else {
    }

    const formData = new FormData(form);
    const profileData = Object.fromEntries(formData.entries());

    profileData.profile_picture_url = profile_picture_url;
    profileData.cv_url = cv_url;


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
        alert(" Profile save failed: " + errMsg);
        throw new Error(errMsg || "Profile update failed");
      }

      const result = await res.json();
      alert(" Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(" Error saving profile: " + err.message);
    }
  };
});
