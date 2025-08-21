// js/utils/uploadFile.js
export async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
  
    const res = await fetch(`${CONFIG.API_BASE_URL}/uplodeFile`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error("Failed to upload file: " + errorText);
    }
  
    const data = await res.json();
    return data.url;
  }
  