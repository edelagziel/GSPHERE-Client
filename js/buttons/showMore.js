export function setupShowMoreButton() {
    document.addEventListener("click", function(e) {
      if (e.target.classList.contains("show-more")) {
        e.preventDefault();
        const id = e.target.dataset.id;
        document.getElementById(`desc-short-${id}`).classList.add("d-none");
        document.getElementById(`desc-full-${id}`).classList.remove("d-none");
      }
      if (e.target.classList.contains("show-less")) {
        e.preventDefault();
        const id = e.target.dataset.id;
        document.getElementById(`desc-short-${id}`).classList.remove("d-none");
        document.getElementById(`desc-full-${id}`).classList.add("d-none");
      }
    });
  }
  