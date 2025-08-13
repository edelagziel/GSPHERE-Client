export function setupCameraButton(openCameraBtn, profilePicture) {
    openCameraBtn.addEventListener("click", async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const modal = document.createElement("div");
        modal.className = "modal d-block bg-dark bg-opacity-75";
        modal.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;";
        modal.innerHTML = `
          <div class="bg-white p-3 rounded text-center">
            <video autoplay style="width: 300px;" class="mb-3 rounded"></video>
            <br>
            <button class="btn btn-success me-2">📸 Capture</button>
            <button class="btn btn-danger">✖ Cancel</button>
          </div>`;
        
        modal.querySelector("video").srcObject = stream;
  
        modal.querySelector(".btn-success").onclick = () => {
          const canvas = document.createElement("canvas");
          const video = modal.querySelector("video");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext("2d").drawImage(video, 0, 0);
          profilePicture.src = canvas.toDataURL("image/png");
          stream.getTracks().forEach(t => t.stop());
          modal.remove();
        };
  
        modal.querySelector(".btn-danger").onclick = () => {
          stream.getTracks().forEach(t => t.stop());
          modal.remove();
        };
  
        document.body.appendChild(modal);
      } catch (err) {
        alert("Could not access camera: " + err.message);
      }
    });
  }
  