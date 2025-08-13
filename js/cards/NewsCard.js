export function newsCard(a) {
    const img = a.urlToImage || "https://via.placeholder.com/600x300?text=No+Image";
    const date = a.publishedAt ? new Date(a.publishedAt).toLocaleString() : "";
    const src  = a.source?.name || "Unknown";
    const desc = a.description || "";
  
    return `
      <div class="mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${img}" class="card-img-top" alt="news"
               onerror="this.src='https://via.placeholder.com/600x300?text=No+Image'">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${a.title || "Untitled"}</h5>
            <p class="card-text flex-grow-1">${desc}</p>
            <div class="small text-muted mb-2">${src} · ${date}</div>
            <a href="${a.url}" target="_blank" rel="noopener" class="btn btn-outline-danger btn-sm mt-auto">
              Read more
            </a>
          </div>
        </div>
      </div>`;
  }
  