// Project fetching functionality
window.addEventListener('DOMContentLoaded', () => {
  fetchProjects();
});

async function fetchProjects() {
  try {
    console.log('🔄 Fetching projects from server...');
    
    const response = await fetch('http://localhost:3000/api/project/mine', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Projects received:', data);
    
    // Display projects in the UI
    displayProjects(data);
    
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    displayError('Failed to load projects. Please try again later.');
  }
}

function displayProjects(projects) {
  const projectsContainer = document.getElementById('projects-row');
  
  if (!projectsContainer) {
    console.error('❌ Projects container not found');
    return;
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    projectsContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info text-center">
          <h5>No projects found</h5>
          <p>Start by creating your first project!</p>
        </div>
      </div>
    `;
    return;
  }

  const projectsHTML = projects.map(project => `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${project.title || project.name || 'Untitled Project'}</h5>
          <p class="card-text">${project.description || project.desc || 'No description available'}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">Created: ${new Date(project.createdAt || project.created_at || Date.now()).toLocaleDateString()}</small>
            <button class="btn btn-outline-primary btn-sm" onclick="viewProject('${project.id || project._id}')">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  projectsContainer.innerHTML = projectsHTML;
}

function displayError(message) {
  const projectsContainer = document.getElementById('projects-row');
  if (projectsContainer) {
    projectsContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center">
          <h5>Error</h5>
          <p>${message}</p>
          <button class="btn btn-outline-danger" onclick="fetchProjects()">Retry</button>
        </div>
      </div>
    `;
  }
}

function viewProject(projectId) {
  console.log('🔍 Viewing project:', projectId);
  // Add navigation to project details page
  // window.location.href = `/project/${projectId}`;
  alert(`Viewing project: ${projectId}`);
}

// Handle form submission for adding new projects
document.addEventListener('DOMContentLoaded', () => {
  const projectForm = document.getElementById('projectForm');
  if (projectForm) {
    projectForm.addEventListener('submit', handleAddProject);
  }
});

async function handleAddProject(event) {
  event.preventDefault();
  
  const title = document.getElementById('projectTitle').value;
  const description = document.getElementById('projectDesc').value;
  
  try {
    const response = await fetch('http://localhost:3000/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title,
        description
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newProject = await response.json();
    console.log('✅ Project created:', newProject);
    
    // Close modal and refresh projects
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProjectModal'));
    if (modal) {
      modal.hide();
    }
    
    // Clear form
    event.target.reset();
    
    // Refresh projects list
    fetchProjects();
    
  } catch (error) {
    console.error('❌ Error creating project:', error);
    alert('Failed to create project. Please try again.');
  }
}
