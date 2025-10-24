<template>
  <!-- Loading state -->
  <div
    v-if="loading"
    style="display: flex; justify-content: center; align-items: center; min-height: 100vh; font-size: 1.5rem; color: #667eea"
  >
    Loading...
  </div>

  <!-- Main app content -->
  <component
    v-else
    :is="currentComponent"
    :mode="currentMode"
    @navigate="handleNavigate"
  />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuth } from './stores/auth';
import Landing from './views/Landing.vue';
import Auth from './views/Auth.vue';
import Dashboard from './views/Dashboard.vue';
import TicketManagement from './views/TicketManagement.vue';

/**
 * Main App Component
 * Handles routing and route protection
 */
const { user, loading, initialize, isAuthenticated } = useAuth();

const currentPage = ref('landing');
const currentMode = ref('login');

// Initialize auth on mount
onMounted(() => {
  initialize();
});

// Watch for auth state changes
watch([loading, user], ([isLoading, currentUser]) => {
  if (!isLoading) {
    if (currentUser) {
      // If user is logged in, redirect to dashboard
      currentPage.value = 'dashboard';
    } else {
      // If not logged in, show landing page
      currentPage.value = 'landing';
    }
  }
});

// Get current component based on page
const currentComponent = computed(() => {
  const components = {
    landing: Landing,
    login: Auth,
    signup: Auth,
    dashboard: Dashboard,
    tickets: TicketManagement
  };

  return components[currentPage.value] || Landing;
});

// Handle navigation
const handleNavigate = (page) => {
  // Protected routes
  const protectedRoutes = ['dashboard', 'tickets'];

  if (protectedRoutes.includes(page) && !isAuthenticated.value) {
    // Redirect to login if trying to access protected route
    currentPage.value = 'login';
    currentMode.value = 'login';
    return;
  }

  // Set mode for auth pages
  if (page === 'login' || page === 'signup') {
    currentMode.value = page;
    currentPage.value = page;
  } else {
    currentPage.value = page;
  }
};
</script>