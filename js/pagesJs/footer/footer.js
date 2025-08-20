export async function loadFooter() {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (!footerPlaceholder) return;
  
    try {
      const res = await fetch("../../page/footer.html");
      const html = await res.text();
      footerPlaceholder.innerHTML = html;
    } catch (err) {
      console.error("Failed to load footer:", err);
    }
  }
  
  // הפעל אוטומטית בטעינה
  window.addEventListener("DOMContentLoaded", loadFooter);
  