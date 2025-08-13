import { setupCameraButton } from "../../buttons/cameraButton.js";
import { setupGalleryButton } from "../../buttons/galleryButton.js";

document.addEventListener("DOMContentLoaded", () => {
  const openCameraBtn = document.getElementById("open-camera-btn");
  const selectFileBtn = document.getElementById("select-file-btn");
  const fileInput = document.getElementById("file-input");
  const profilePicture = document.getElementById("profile-picture");

  setupCameraButton(openCameraBtn, profilePicture);
  setupGalleryButton(selectFileBtn, fileInput, profilePicture);
});
