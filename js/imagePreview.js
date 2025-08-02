// /js/imagePreview.js

document.addEventListener("DOMContentLoaded", function() {
    const urlInput = document.getElementById('image-url');
    const previewImg = document.getElementById('img-preview');
    if (urlInput && previewImg) {
      urlInput.addEventListener('input', function() {
        const url = urlInput.value.trim();
        if (url) {
          previewImg.src = url;
          previewImg.style.display = "block";
          previewImg.onerror = function() {
            previewImg.style.display = "none";
          }
          previewImg.onload = function() {
            previewImg.style.display = "block";
          }
        } else {
          previewImg.style.display = "none";
        }
      });
    }
  });
  