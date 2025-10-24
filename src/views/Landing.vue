<template>
  <div>
    <!-- Header -->
    <AppHeader :showAuth="true" @navigate="$emit('navigate', $event)" />

    <!-- Hero Section -->
    <section class="hero">
      <!-- Decorative circle -->
      <div class="circle-decoration circle-1"></div>

      <div class="container hero-content">
        <h1>Manage Your Tickets Effortlessly</h1>
        <p>
          Track, organize, and resolve support tickets with ease.
          Built for teams that value efficiency and simplicity.
        </p>

        <div class="hero-buttons">
          <button class="btn btn-primary" @click="$emit('navigate', 'signup')">
            Get Started Free
          </button>
          <button class="btn btn-secondary" @click="$emit('navigate', 'login')">
            Login
          </button>
        </div>
      </div>

      <!-- Wavy SVG -->
      <div class="hero-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <!-- Decorative circles -->
      <div class="circle-decoration circle-2"></div>
      <div class="circle-decoration circle-3"></div>

      <div class="container">
        <h2>Why Choose TicketFlow?</h2>

        <div class="feature-grid">
          <!-- Feature 1 -->
          <div class="feature-box">
            <h3>✨ Easy to Use</h3>
            <p>
              Intuitive interface designed for quick ticket creation and management.
              No learning curve required - start managing tickets immediately.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="feature-box">
            <h3>⚡ Real-time Updates</h3>
            <p>
              Track ticket status changes instantly. Stay informed with live
              notifications and seamless updates across your team.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="feature-box">
            <h3>🔒 Secure & Reliable</h3>
            <p>
              Your data is protected with industry-standard security measures.
              Role-based access control keeps your information safe.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';

/**
 * Landing Page - First page users see
 * 
 * Emits:
 * - navigate: Navigation event
 */
defineEmits(['navigate']);
</script>