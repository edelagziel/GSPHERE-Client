import { newsCard } from "../../cards/NewsCard.js";

document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("news-list");
  const placeholder = document.getElementById("news-placeholder");

  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/news`, { credentials: "include" });
    if (!res.ok) throw new Error("bad status");
    const articles = await res.json();

    placeholder?.remove();
    listEl.innerHTML = Array.isArray(articles) && articles.length
      ? articles.map(newsCard).join("")
      : `<div class="alert alert-warning text-center">No news.</div>`;
  } catch (e) {
    console.error("news error:", e);
    placeholder?.remove();
    listEl.innerHTML = `<div class="alert alert-danger text-center">Failed to load news.</div>`;
  }
});
