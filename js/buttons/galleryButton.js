export function setupGalleryButton(selectFileBtn, fileInput, profilePicture) {
    selectFileBtn.addEventListener("click", () => {
      fileInput.click();
    });
  
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePicture.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
  