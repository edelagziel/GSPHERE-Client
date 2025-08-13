export function ShowAllProjectCard(project) 
{
    const 
    {
      first_name = "",
      last_name  = "",
      projectid,
      owner_id,
      title = "Untitled",
      description = "",
      image_url = "",
      created_at,
      stage_name = ""
    } = project || {};
  
    const created = created_at ? new Date(created_at).toLocaleDateString() : "";
    const short   = description.length > 120 ? description.slice(0, 120) + "…" : description;
  
    // Add the card-hover-scale class to the card for hover effect
    return `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm card-hover-scale">
          ${image_url ? `<img src="${image_url}" class="card-img-top" style="object-fit:cover;max-height:220px;" alt="Project Image">` : ""}
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-1">${title}</h5>
            <div class="text-muted small mb-2">Owner: ${first_name} ${last_name} </div>
            <div class="text-muted small mb-2">Stage: ${stage_name}</div>
            <p class="card-text flex-grow-1">${short || "<span class='text-muted'>No description.</span>"}</p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <small class="text-muted">Created: ${created}</small>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-primary btn-sm join-btn" data-id="${projectid}">Join Request</button>
              <button class="btn btn-outline-info btn-sm more-info-btn" data-id="${projectid}">More Info</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }