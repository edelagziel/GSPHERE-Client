export function newsCard(a) {
  const img = a.urlToImage || "https://via.placeholder.com/600x300?text=No+Image";
  const date = a.publishedAt ? new Date(a.publishedAt).toLocaleString() : "";
  const src  = a.source?.name || "Unknown";
  const desc = a.description || "";

  return `
    <div class="news-card shadow-sm">
      <img src="${img}" class="news-img-top" alt="news"
           onerror="this.src='https://via.placeholder.com/600x300?text=No+Image'">
      <div class="news-card-body d-flex flex-column">
        <h5 class="news-title mb-2">${a.title || "Untitled"}</h5>
        <p class="news-summary card-text flex-grow-1 mb-2">${desc}</p>
        <div class="news-meta small mb-2">${src} · ${date}</div>
<a href="${a.url}" target="_blank" rel="noopener" class="btn btn-outline-info btn-sm mt-auto">
          Read more
        </a>
      </div>
    </div>
  `;
}
