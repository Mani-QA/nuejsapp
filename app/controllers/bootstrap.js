import { router } from '/@nue/app-router.js'
import { model } from '../model/index.js'
import { mount } from '/@nue/mount.js'


// setup routing and state management
router.configure({
  route: '/app/:type/:filter',
  url_params: ['query', 'id', 'start', 'sort', 'asc', 'shot'],
  session_params: ['plans_opened', 'sizes_opened', 'nav_opened'],
  persistent_params: ['show_grid_view']
})

// setup application - bypass login
addEventListener('route:app', async () => {
  // Assume authenticated: Initialize model and mount app
  try {
    await model.initialize(); // Initialize data structures, etc.
    await model.load(); // Load actual data
    mount('app', window.app); // Mount the main app component
  } catch (error) {
    console.error("Error initializing or mounting the application:", error);
    // Optionally display an error message to the user
  }
});

// disable CSS transition distractions when hot-reloaded
addEventListener('hmr', () => {
  app.classList.add('hmr')
  setTimeout(() => app.classList.remove('hmr'), 100)
})

// page loaded directly (not through MPA routing)
if (window.app) dispatchEvent(new Event('route:app'))