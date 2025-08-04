export function createProjectCard(project, stageText, visibilityText, createdAt, imageHtml) 
{
    const cardId = `project-card-${project.id}`;
    const shortDesc = project.description?.slice(0, 60) || '';
    const isLong = (project.description?.length || 0) > 60;

    return `
      <div class="card shadow-sm project-card flex-fill" id="${cardId}">
        ${imageHtml}
        <div class="card-body">
          <h5 class="card-title mb-2">${project.title}</h5>
          <p class="card-text mb-2" id="desc-short-${project.id}">
            ${shortDesc}${isLong ? '... ' : ''}
            ${isLong ? `<a href="#" class="show-more" data-id="${project.id}">Show more</a>` : ''}
          </p>
          <p class="card-text mb-2 d-none" id="desc-full-${project.id}">
            ${project.description}
            <a href="#" class="show-less" data-id="${project.id}">Show less</a>
          </p>
          <ul class="list-unstyled mb-2">
            <li><strong>Stage:</strong> ${stageText}</li>
            <li><strong>Visibility:</strong> ${visibilityText}</li>
          </ul>
          <div class="d-flex gap-2 mt-2 align-items-center">
            <button class="btn btn-outline-primary btn-sm enter-btn" data-id="${project.id}">Enter Project</button>
            <button class="btn btn-outline-danger btn-sm leave-btn" data-id="${project.id}">Leave Project</button>
            <button class="btn btn-outline-warning btn-sm update-btn d-flex align-items-center" data-id="${project.id}" title="Update Project">
              <i class="bi bi-pencil-square me-1"></i> Update
            </button>
          </div>
          <p class="text-muted mb-0 mt-2" style="font-size:0.9em;">Created at: ${createdAt}</p>
        </div>
      </div>
    `;
}
