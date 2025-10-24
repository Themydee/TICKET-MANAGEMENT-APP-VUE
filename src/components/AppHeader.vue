<template>
  <header class="header">
    <div class="container header-content">
      <!-- Logo -->
      <div class="logo" @click="$emit('navigate', 'landing')">TicketFlow</div>

      <!-- Desktop Navigation -->
      <nav class="nav-links">
        

        <template v-if="showAuth">
          <button class="btn btn-secondary" @click="$emit('navigate', 'login')">Login</button>
          <button class="btn btn-primary" @click="$emit('navigate', 'signup')">Get Started</button>
        </template>

        <template v-if="showLogout && user">
          <div style="display: flex; align-items: center; gap: 1rem">
            <span style="color: #6b7280">
              Welcome, <strong>{{ user.username }}</strong>
            </span>
            <button class="btn btn-secondary" @click="handleLogout">
              <LogOut :size="18" />
              Logout
            </button>
          </div>
        </template>
      </nav>

      <!-- Mobile Toggle -->
      <button class="mobile-nav-toggle" @click="toggleMobileNav">
        <svg v-if="!mobileNavOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-menu">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ active: mobileNavOpen }">
      <div v-if="showLogout && user" class="mobile-user-info">
        Welcome, <strong>{{ user.username }}</strong>
      </div>

      <div class="mobile-nav-links">
        <template v-if="showLogout && user">
          <button class="btn btn-secondary mobile-btn" @click="navigateAndClose('dashboard')">Dashboard</button>
          <button class="btn btn-secondary mobile-btn" @click="navigateAndClose('tickets')">Tickets</button>
          <button class="btn btn-secondary mobile-btn" @click="handleLogout">
            <LogOut :size="18" />
            Logout
          </button>
        </template>

        <template v-if="showAuth">
          <button class="btn btn-secondary mobile-btn" @click="navigateAndClose('login')">Login</button>
          <button class="btn btn-primary mobile-btn" @click="navigateAndClose('signup')">Get Started</button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { LogOut } from 'lucide-vue-next'
import { useAuth } from '../stores/auth'

const props = defineProps({
  showAuth: { type: Boolean, default: false },
  showLogout: { type: Boolean, default: false },
})

const emit = defineEmits(['navigate'])
const { user, logout } = useAuth()

const mobileNavOpen = ref(false)
const toggleMobileNav = () => (mobileNavOpen.value = !mobileNavOpen.value)

const navigateAndClose = (page) => {
  emit('navigate', page)
  mobileNavOpen.value = false
}

const handleLogout = () => {
  logout()
  emit('navigate', 'landing')
  mobileNavOpen.value = false
}
</script>
